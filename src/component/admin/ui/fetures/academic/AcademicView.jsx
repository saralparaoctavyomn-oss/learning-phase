"use client"
import React, { useEffect, useState } from 'react'
import { AcademicTable } from './AcademicTable'
import Academicheader from './Academicheader'


export default function AcademicView() {
    const [newdata, setData] = useState([])

    const [active, setActive] = useState("All")

    const fetchStudents = async () => {
        const res = await fetch("/api/admin/academic", {
            method: "GET",
        })

        if (!res) {
            return console.log("error")
        }
        const data = await res.json()
        setData(data.data)
    }

    useEffect(() => {


        fetchStudents()
    }, [])


    const handelDelete = async (rgId) => {
        const res = await fetch("/api/admin/academic", {
            method: "DELETE",
            body: JSON.stringify({ rgId })
        })
        const data = await res.json()
        if (!data) {
            return alert("data not delete")
        }
        return setData((prev) => prev.filter(student => student.registration_number !== rgId));
    }


    return (
        <div className='grid w-full'>
            <header>
                <Academicheader setData={setData}   />
            </header>

                <AcademicTable handelDelete={handelDelete} setData={newdata}  />

        </div>
    )
}
