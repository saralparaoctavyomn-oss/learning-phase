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
        c.section_name 
    FROM students_details s
    INNER JOIN registration_details r ON s.st_id = r.student_id
    LEFT JOIN class_details c ON s.cl_sc_id = c.id
    WHERE r.status = 0
`);
    return NextResponse.json({ message: "Get request successfull", data: rows }, { status: 200 })
}
export async function POST(request) {

    const body = await request.json()

    const { name, dob, gender, fatherName, motherName, address, phoneNo, emailId, classId, nationality, cast, academicyear } = body




    const stId = v4()
    const date = DateTime.now()

    const query = `INSERT INTO students_details ( st_id,roll_no, name, dob, father_name, mothername, address, phone_no, email, cl_sc_id,is_Active,isBn,gender,nationality,cast,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    const [result] = await pool.execute(query, [stId, "", name, dob, fatherName, motherName, address, phoneNo, emailId, classId, true, false, gender, nationality, cast, date])
    if (!result) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 })
    }

    const rgId = v4()
    const currentYear = DateTime.now().year
    const rgquery = `INSERT INTO registration_details ( reg_id,student_id,class_id,reg_year,ac_id) VALUES (?,?,?,?,?)`
    const [rgresult] = await pool.execute(rgquery, [rgId, stId, classId, currentYear, academicyear])
    if (!rgresult) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 })
    }

    const mainData = {
        st_id: stId, name: name, dob: dob, father_name: fatherName, mothername: motherName, address: address, phone_no: phoneNo, email: emailId, cl_sc_id: classId,
    }
    return NextResponse.json({ message: "Data saved successfull", data: mainData }, { status: 200 })
}

export async function DELETE(request) {
    const { rgId } = await request.json()

    const query = `DELETE FROM registration_details WHERE registration_number = ?`;
    const [result] = await pool.execute(query, [rgId]);
    if (!result) {
        return NextResponse.json({ message: "data not delete" }, { status: 500 })
    }

    return NextResponse.json({ message: 'data delete successfull' }, { status: 200 })
}