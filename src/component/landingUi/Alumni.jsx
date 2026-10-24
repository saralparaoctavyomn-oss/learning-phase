import { Button } from '@/components/ui/button'
import React from 'react'
import AlumniCrousal from './AlumniCrousal'

export default function Alumni() {
    const craData = [
        {
            id: 1,
            src: "/techer.webp",
            name: "DR.Ramprashad Sastri",
            qualification: "PHD",
            level: "Seniour Since Techer"
        },
        {
            id: 2,
            src: "/techer.webp",
            name: "DR.Ramprashad Sastri",
            qualification: "PHD",
            level: "Seniour Since Techer"
        },
        {
            id: 3,
            src: "/techer.webp",
            name: "DR.Ramprashad Sastri",
            qualification: "PHD",
            level: "Seniour Since Techer"
        },
        {
            id: 4,
            src: "/techer.webp",
            name: "DR.Ramprashad Sastri",
            qualification: "PHD",
            level: "Seniour Since Techer"
        },
        {
            id: 5,
            src: "/techer.webp",
            name: "DR.Ramprashad Sastri",
            qualification: "PHD",
            level: "Seniour Since Techer"
        },
    ]
    return (
        <div className='campus-main w-full flex justify-center items-center py-10'>
            <div className="campus-contnet w-full max-w-[1200px]">
                <div className="top-section w-full flex items-start gap-16 py-8">
                    <h1 className='uppercase font-bold text-3xl'>our alumni</h1>
                    <div className="right max-w-[600px] grid gap-4">
                        <p>We have best of the best knowledgeble Techer for you to give better education better knowledge with help or guidience you future </p>
                        <Button className={"w-fit bg-white text-black hover:bg-gray-300 "}>join career opportunities</Button>
                    </div>
                </div>
                <AlumniCrousal craData={craData} />
            </div>
        </div>
    )
}
