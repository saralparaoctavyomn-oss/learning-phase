import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";

export async function GET(request) {
    const [res] = await pool.query("SELECT * FROM academic_year")
    return NextResponse.json({ message: "Get request successfull", data: res }, { status: 200 })
}
export async function POST(request) {

    const body = await request.json()

    const {academicYear,startDate,endDate  } = body

    //find the already exist -roll no 


    const acYear = v4()

    const query = `INSERT INTO academic_year (ac_id,ac_year,is_active,start_date,end_date) VALUES (?, ?, ?,?,?)`
    const [result] = await pool.execute(query, [acYear, academicYear,true,startDate,endDate])
    if (!result) {
        return NextResponse.json({ message: 'data not saved' }, { status: 500 })
    }
    const mainData = {
        ac_id:acYear,
        ac_year: academicYear,
        is_active:true

    }
    return NextResponse.json({ message: "Data saved successfull", data: mainData }, { status: 200 })
}

export async function DELETE(request) {
    const { rgId } = await request.json()

    const query = `DELETE FROM academic_year WHERE ac_id = ?`;
    const [result] = await pool.execute(query, [rgId]);
    if (!result) {
        return NextResponse.json({ message: "data not delete" }, { status: 500 })
    }

    return NextResponse.json({ message: 'data delete successfull' }, { status: 200 })
}