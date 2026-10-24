"use client"
import React, { useEffect, useState } from 'react'
import { TecherTable } from './TecherTable'
import Academicheader from './TecherHeader'


export default function TecherView() {
    const [newdata, setData] = useState([])

    const [active, setActive] = useState("All")

    const fetchStudents = async () => {
        const res = await fetch("/api/admin/techer", {
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
        const res = await fetch("/api/admin/techer", {
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

                <TecherTable handelDelete={handelDelete} setData={newdata}  />

        </div>
    )
}
