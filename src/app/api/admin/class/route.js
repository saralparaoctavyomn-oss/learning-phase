import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";

export async function GET(request) {
    const [res] = await pool.query("SELECT * FROM class_details")
    return NextResponse.json({ message: "Get request successfull", data: res }, { status: 200 })
}
export async function POST(request) {

    const body = await request.json()

    const { className,section,academic } = body
    console.log(body)
    //find the already exist -roll no 


    const rgId = v4()

    const query = `INSERT INTO class_details ( id, class_name, section_name, academic_year) VALUES (?, ?, ?, ?)`
    const [result] = await pool.execute(query, [rgId, className,  section,academic])
    if (!result) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 })
    }
    const mainData = {
        id: rgId,
        class_name: className,
        section_name: section,
        academic_year: academic,

    }
    return NextResponse.json({ message: "Data saved successfull", data: mainData }, { status: 200 })
}

export async function DELETE(request) {
    const { rgId } = await request.json()

    const query = `DELETE FROM class_details WHERE id = ?`;
    const [result] = await pool.execute(query, [rgId]);
    if (!result) {
        return NextResponse.json({ message: "data not delete" }, { status: 500 })
    }

    return NextResponse.json({ message: 'data delete successfull' }, { status: 200 })
}