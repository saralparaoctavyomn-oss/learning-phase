import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";

export async function GET(request) {
    const [res] = await pool.query("SELECT * FROM techer_details")
    return NextResponse.json({ message: "Get request successfull", data: res }, { status: 200 })
}
export async function POST(request) {
    const body = await request.json();
    const { techer_name, techer_dob, techer_qualification, techer_phone_no, techer_address, techer_joining_date } = body;

    const year = new Date().getFullYear();

    // 1. Generate Teacher ID (id)
    const [teacherRows] = await pool.execute(
        `SELECT id FROM techer_details 
         ORDER BY CAST(SUBSTRING_INDEX(id, '-', -1) AS UNSIGNED) DESC 
         LIMIT 1`
    );

    let nextNumber = 1000;
    if (teacherRows.length > 0 && teacherRows[0].id) {
        const lastId = teacherRows[0].id;
        const lastNumber = parseInt(lastId.split('-').pop(), 10);
        if (!isNaN(lastNumber)) {
            nextNumber = lastNumber + 1;
        }
    }
    const formattedTeacherId = `TCH-${year}-${String(nextNumber).padStart(4, '0')}`;

    // 2. Generate Employee ID (employ_id) - FIXED variables here
    const [empteacherRows] = await pool.execute(
        `SELECT employ_id FROM techer_details 
         ORDER BY CAST(SUBSTRING_INDEX(employ_id, '-', -1) AS UNSIGNED) DESC 
         LIMIT 1`
    );

    let epnextNumber = 1000;
    if (empteacherRows.length > 0 && empteacherRows[0].employ_id) {
        const lastEmpId = empteacherRows[0].employ_id;
        const lastEmpNumber = parseInt(lastEmpId.split('-').pop(), 10);
        if (!isNaN(lastEmpNumber)) {
            epnextNumber = lastEmpNumber + 1;
        }
    }
    const epformattedTeacherId = `EMP-${year}-${String(epnextNumber).padStart(4, '0')}`;

    const TCPass = `${techer_name}@${year}/${nextNumber}`;

    // 3. Find active academic year
    const [findAcademic] = await pool.execute(
        `SELECT ac_id FROM academic_year WHERE is_Active = 1`
    );

    if (!findAcademic || findAcademic.length === 0) {
        return NextResponse.json({ message: 'Active academic year not found' }, { status: 500 });
    }

    // 4. Insert into database
    const query = `INSERT INTO techer_details (id, employ_id, techer_name, techer_qualification, techer_phone_no, techer_address, techer_joining_date, techer_pass, techer_dob, is_active, ac_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.execute(query, [
        formattedTeacherId,
        epformattedTeacherId,
        techer_name,
        techer_qualification,
        techer_phone_no,
        techer_address,
        techer_joining_date,
        TCPass,
        techer_dob,
        1,
        findAcademic[0].ac_id
    ]);

    if (!result) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 });
    }

    return NextResponse.json({ message: "Data saved successfully",dat:result[0] }, { status: 200 });
}

export async function DELETE(request) {
    const { rgId } = await request.json()

    const query = `DELETE FROM techer_details WHERE id = ?`;
    const [result] = await pool.execute(query, [rgId]);
    if (!result) {
        return NextResponse.json({ message: "data not delete" }, { status: 500 })
    }

    return NextResponse.json({ message: 'data delete successfull' }, { status: 200 })
}