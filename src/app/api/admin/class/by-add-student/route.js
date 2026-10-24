import { NextResponse } from "next/server";
import pool from "@/lib/db"
import { v4 } from "uuid";



export async function GET(request) {
    const [res] = await pool.query(
        'SELECT * FROM class_details'
    );
    if (!res) {
        return NextResponse.json({ message: "Data not send becuse find error" }, { status: 500 })
    }
    return NextResponse.json({ message: "Data send Successfull", data: res }, { status: 200 })
}