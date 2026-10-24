import pool from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { jwtSign } from "@/services/jwt/jwt"
import { cookies } from "next/headers"

const secret = process.env.JWT_SECRET || "default_secret"




export async function POST(request) {
    const { combineData, password } = await request.json()
    const cookieStore = await cookies()

    console.log(combineData, password)

    if (!combineData || !password) {
        return NextResponse.json({ message: "Please fill the field" }, { status: 400 })

    }

    let query
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(combineData);

    if (!isEmail) {
        query = `SELECT admin_id,admin_email,admin_pass,role,admin_name  FROM admin WHERE  admin_id = ?`;
    } else {
        query = `SELECT admin_id,admin_email,admin_pass,role,admin_name FROM admin WHERE  admin_email = ?`;
    }
    const [result] = await pool.execute(query, [combineData]);
    console.log(result[0])

    if (!result[0] || result[0].length === 0) {
        return NextResponse.json({ message: "Your Credetial Not availabel" }, { status: 500 })
    }

    const isMatch = await bcrypt.compare(password, result[0].admin_pass)
    if (!isMatch) {
        return NextResponse.json({ message: "Password not match" }, { status: 400 })
    }

    const token = await jwtSign(result[0], secret || "this_is_my_secret")
    console.log(token)

    const myCookie = cookieStore.set("lrg-token",token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    })
    const myRes = NextResponse.json({ message: "Login Succesfull", srcId: token }, { status: 200 })

    return myCookie, myRes
}