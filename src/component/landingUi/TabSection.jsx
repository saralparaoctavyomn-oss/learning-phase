"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import CampusView from './CampusView'
import AcademicView from './AcademicView'

export default function TabSection() {
    const [active, setActive] = useState("Our Campus")
    const buttons = [
        {
            id: 1,
            label: "Our Campus"
        },
        {
            id: 2,
            label: "Academics"
        }
    ]
    const handelClick = (label) => {
        setActive(label)
    }
    return (
        <div className='w-full flex justify-center items-center'>
            <div className="tabs-cotnent w-full max-w-[1200px]">
                <div className="tab-buttons gap-2 flex">
                    {
                        buttons.map((data, index) => (
                            <Button variant='outline' className={`border-none underline underline-offset-16 ${active === data.label ? "bg-black text-white" : ""}`} onClick={() => handelClick(data.label)}>{data.label}</Button>
                        ))
                    }
                </div>
                {active === "Our Campus" && (
                    <div>
                        <CampusView />
                    </div>
                )}
                {active === "Academics" && (
                    <div>
                        <AcademicView />
                    </div>
                )}
            </div>
        </div>
    )
}
