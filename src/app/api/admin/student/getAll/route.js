import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";

export async function GET(request) {
    const [res] = await pool.query(`
    SELECT 
        s.*, 
        r.*, 
        c.* 
    FROM students_details s
    INNER JOIN registration_details r ON s.st_id = r.student_id
    LEFT JOIN class_details c ON s.cl_sc_id = c.id
`);

    return NextResponse.json({ message: "Get request successful", data: res }, { status: 200 });
}
export async function POST(request) {

    const body = await request.json()

    const { rollNo, name, dob, fatherName, motherName, address, className, section, phoneNo, emailId } = body

    //find the already exist -roll no 


    const rgId = v4()

    const query = `INSERT INTO students_details ( registration_number, roll_no, name, dob, father_name, mothername, address, phone_no, email, class, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const [result] = await pool.execute(query, [rgId, rollNo, name, dob, fatherName, motherName, address, phoneNo, emailId, className, section])
    if (!result) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 })
    }
    const mainData = {
        registration_number: rgId,
        roll_no: rollNo,
        name: name,
        dob: dob,
        father_name: fatherName,
        mother_name: motherName,
        address: address,
        phone_no: phoneNo,
        email: emailId,
        class: className,
        section: section

    }
    return NextResponse.json({ message: "Data saved successfull", data: mainData }, { status: 200 })
}

export async function DELETE(request) {
    const { rgId } = await request.json()

    const query = `DELETE FROM students_details WHERE registration_number = ?`;
    const [result] = await pool.execute(query, [rgId]);
    if (!result) {
        return NextResponse.json({ message: "data not delete" }, { status: 500 })
    }

    return NextResponse.json({ message: 'data delete successfull' }, { status: 200 })
}