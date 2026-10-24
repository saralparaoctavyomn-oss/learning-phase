"use client"
import React, { useEffect, useState } from 'react'
import { ClassTable } from './ClassTable'
import ClassHeader from './ClassHeader'

export default function ClassView () {
    const [newdata, setData] = useState([])


    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch("/api/admin/class", {
                method: "GET",
            })

            if (!res) {
                return console.log("error")
            }
            const data = await res.json()
            setData(data.data)
        }
        fetchStudents()
    }, [])


    const handelDelete = async (rgId) => {
        const res = await fetch("/api/admin/class", {
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
                <ClassHeader setData={setData}/>
            </header>
            <ClassTable handelDelete={handelDelete} newdata={newdata} />
        </div>
    )
}
