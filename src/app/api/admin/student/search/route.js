import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
      return NextResponse.json([], { status: 200 });
    }

    const searchTerm = `%${query.trim()}%`;

    // SQL Logic:
    // 1. Start from registration_details (r)
    // 2. Filter out status = 1 (allow only NULL or 0)
    // 3. Search query in registration fields
    // 4. Join students_details (s) where the student IDs match
    const sqlQuery = `
      SELECT s.*, r.* 
      FROM registration_details r
      INNER JOIN students_details s ON s.st_id = r.student_id
      WHERE (r.student_id LIKE ? OR r.reg_id LIKE ?)
      AND (r.status IS NULL OR r.status = 0)
      LIMIT 10;
    `;

    const [rows] = await pool.query(sqlQuery, [searchTerm, searchTerm]);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database Search Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}