import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";
import { DateTime } from "luxon";

export async function GET(request) {
    const [rows] = await pool.query(`
    SELECT 
        s.*, 
        r.*, 
        c.class_name, 
        c.section_name,
        reg.status
    FROM \`registration_details\` reg
    INNER JOIN admission_details r ON reg.student_id = r.st_id
    INNER JOIN students_details s ON r.st_id = s.st_id
    LEFT JOIN class_details c ON s.cl_sc_id = c.id
    WHERE reg.status = 1
    `);
    if (!rows) {
        return NextResponse.json({ message: "not get the date" }, { status: 500 })
    }

    return NextResponse.json({ message: "Get request successfull", data: rows }, { status: 200 })
}
export async function POST(request) {
    try {
        const body = await request.json();
        // console.log(body);
        const { currentStudent, appprovedBy, type, pyMethod, ammount } = body;
        const crstData = JSON.parse(currentStudent);

        // 1. Check existing admission to prevent duplicates
        const [existingAdmission] = await pool.execute(
            `SELECT admission_id FROM admission_details WHERE st_id = ? AND ac_id = ? LIMIT 1`,
            [crstData.st_id, crstData.ac_id]
        );
        if (existingAdmission.length > 0) {
            return NextResponse.json(
                { message: 'Student is already admitted in this academic year.' },
                { status: 400 }
            );
        }

        const adId = v4();
        const date = DateTime.now().toJSDate(); // Ensure standard Date format for DB

        // 2. Fetch Academic Year
        const [academicRows] = await pool.execute(
            `SELECT ac_year FROM academic_year WHERE ac_id = ? LIMIT 1`,
            [crstData.ac_id]
        );
        if (academicRows.length === 0) {
            return NextResponse.json({ message: 'Academic year not found' }, { status: 404 });
        }
        const acYear = academicRows[0].ac_year;

        // 3. Generate Roll Number safely (Extracting the numeric suffix)
        const [rollRows] = await pool.execute(
            `SELECT roll_no FROM admission_details 
       WHERE class_id = ? 
       ORDER BY CAST(SUBSTRING_INDEX(roll_no, '-', -1) AS UNSIGNED) DESC 
       LIMIT 1`,
            [crstData.class_id]
        );

        let newrol;
        if (rollRows.length === 0) {
            newrol = "001";
        } else {
            // Safely extract the last digits from "ST-2026-001"
            const lastRollStr = rollRows[0].roll_no;
            const parts = lastRollStr.split('-');
            const lastRollNum = parseInt(parts[parts.length - 1], 10);
            newrol = String(lastRollNum + 1).padStart(3, '0');
        }

        const rollNO = `ST-${acYear}-${newrol}`;

        // 4. Insert into admission_details
        const query = `INSERT INTO admission_details (
      admission_id, reg_id, st_id, class_id, roll_no, ac_id, approved_by, 
      approved_at, admission_date, admission_type, admission_status, payment_method
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

        const [result] = await pool.execute(query, [
            adId, crstData.reg_id, crstData.st_id, crstData.class_id, rollNO,
            crstData.ac_id, appprovedBy, date, date, type, true, pyMethod
        ]);

        if (!result || result.affectedRows === 0) {
            return NextResponse.json({ message: 'Admission data not saved' }, { status: 500 });
        }

        // 5. Insert into payment_details
        const pyID = v4();
        const mtQuery = `INSERT INTO payment_details (
      payment_id, payment_type, registration_id, admission_id, st_id, 
      class_id, ac_id, payment_date, payment_ammount, pmt_recived_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [method] = await pool.execute(mtQuery, [
            pyID, pyMethod, crstData.reg_id, adId, crstData.st_id,
            crstData.class_id, crstData.ac_id, date, ammount, appprovedBy
        ]);

        if (!method || method.affectedRows === 0) {
            return NextResponse.json({ message: 'Payment data not saved' }, { status: 500 });
        }

        // 6. Corrected Payment Details Select query syntax
        const pytgetquery = `SELECT * FROM payment_details WHERE admission_id = ? LIMIT 1`;
        const [paymentDetailsRows] = await pool.execute(pytgetquery, [adId]);

        // 7. Update Registration Details Status
        const regUpdatequery = `UPDATE registration_details SET status = 1 WHERE student_id = ?`;
        const [regUpdate] = await pool.execute(regUpdatequery, [crstData.st_id]);

        if (!regUpdate || regUpdate.affectedRows === 0) {
            return NextResponse.json({ message: 'Registration status update failed' }, { status: 500 });
        }

        // 1. Create the combined password string first
        const mixedPassword = `${crstData.name}@${crstData.reg_year}`;

        // 2. Use placeholders (?) for ALL variables to ensure proper SQL formatting
        const stpdatequery = `UPDATE students_details SET roll_no = ?, st_pass = ? WHERE st_id = ?`;

        // 3. Pass all three variables in the execution array in the exact order they appear in the query
        const [stUpdate] = await pool.execute(stpdatequery, [rollNO, mixedPassword, crstData.st_id]);


        if (!stUpdate || stUpdate.affectedRows === 0) {
            return NextResponse.json({ message: 'Registration status update failed' }, { status: 500 });
        }
        const adQueryForget = `SELECT * FROM academic_year WHERE ac_id = ? LIMIT 1`;
        const [adResResult] = await pool.execute(adQueryForget, [crstData.ac_id]);
        const classResresult = `SELECT * FROM class_details WHERE id = ? LIMIT 1`;
        const [classResultres] = await pool.execute(classResresult, [crstData.class_id]);
        const resData = [
            {
                ac_year: adResResult[0].ac_year,
                class: classResultres[0].class_name,
                section: classResultres[0].section_name
            }
        ]
        return NextResponse.json(
            { message: "Data saved successfully", rollNo: rollNO, payment: paymentDetailsRows[0], resData: resData },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error: ", error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
