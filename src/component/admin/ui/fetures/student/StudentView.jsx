"use client"
import React, { useEffect, useState } from 'react'
import { StudetnTable } from './StudentTable'
import Studetnheader from './Studetnheader'
import { AdmistionTable } from './Table/AdmissionTable'
import { RegTable } from './Table/RegTable'

export default function StudentView() {
    const [newdata, setData] = useState([])
    const [regData, setRgdata] = useState([])
    const [adminData, setAdminData] = useState([])
    const [active, setActive] = useState("All")

    const regFetchData = async () => {
        const res = await fetch("/api/admin/student/registration", {
            method: "GET",
        })

        if (!res) {
            return console.log("error")
        }
        const data = await res.json()
        setRgdata(data.data)
    }
    const fetchStudents = async () => {
        const res = await fetch("/api/admin/student/getAll", {
            method: "GET",
        })

        if (!res) {
            return console.log("error")
        }
        const data = await res.json()
        setData(data.data)
    }
    const admisionFetchData = async () => {
        const res = await fetch("/api/admin/student/admission", {
            method: "GET",
        })

        if (!res) {
            return console.log("error")
        }
        const data = await res.json()
        setAdminData(data.data)
    }

    useEffect(() => {

        admisionFetchData()
        regFetchData()
        fetchStudents()
    }, [])


    const handelDelete = async (rgId) => {
        const res = await fetch("/api/admin/student/getAll", {
            method: "DELETE",
            body: JSON.stringify({ rgId })
        })
        const data = await res.json()
        if (!data) {
            return alert("data not delete")
        }
        return setData((prev) => prev.filter(student => student.registration_number !== rgId));
    }

    const Tabs = [
        {
            id: 1,
            label: "All",
            color: ""
        },
        {
            id: 1,
            label: "Complete",
            color: "bg-green-500"
        },
        {
            id: 1,
            label: "Pending",
            color: "bg-red-500"

        }
    ]
    return (
        <div className='grid w-full'>
            <header>
                <Studetnheader setAdminData={setAdminData} setRgdata={setRgdata} setData={setData} Tabs={Tabs} setActive={setActive} active={active} />
            </header>
            {active === "All" && (
                <StudetnTable handelDelete={handelDelete} newdata={newdata} active={active} />

            )}
            {active === "Complete" && (
                <AdmistionTable handelDelete={handelDelete} adminData={adminData} active={active} />

            )}
            {active === "Pending" && (
                <RegTable handelDelete={handelDelete} regData={regData} active={active} />

            )}
        </div>
    )
}
