import { Button } from '@/components/ui/button'
import React from 'react'
// import CrousalMain from './CrousalMain'
import CrousalScore from './CrousalScore'

export default function TopScrroer() {
    const craData = [
        {
            id: 1,
            src: "/student.webp",
            name: "Sibani Das",
            score: "99%",
            board: "CBSE",
            color: "bg-black",
            text: "text-white",
        },
        {
            id: 2,
            src: "/student.webp",
            name: "Sibani Das",
            score: "99%",
            board: "CBSE",
            color: "bg-white",
            text: "text-black",
        },
        {
            id: 3,
            src: "/student.webp",
            name: "Sibani Das",
            score: "99%",
            board: "CBSE",
            color: "bg-black",
            text: "text-white",
        },
        {
            id: 4,
            src: "/student.webp",
            name: "Sibani Das",
            score: "99%",
            board: "CBSE",
            color: "bg-white",
            text: "text-black",
        },
        {
            id: 5,
            src: "/student.webp",
            name: "Sibani Das",
            score: "99%",
            board: "CBSE",
            color: "bg-black",
            text: "text-white",
        },
    ]
    return (
        <div className='campus-main w-full flex justify-center items-center py-10'>
            <div className="campus-contnet w-full max-w-[1200px]">
                <div className="top-section w-full grid items-start py-8 max-w-[600px] leading-tight gap-4">
                    <h1 className='uppercase font-bold text-3xl'>our top scorer in past academic year</h1>
                    <div className="right  grid gap-4">
                        <p>Sacred Heart School is delighted of its modern amenities and facilities designed specifically to allow students to excel academically, socially, and physically. </p>
                        <Button className={"w-fit bg-yellow-500"}>Next your Turn</Button>
                    </div>
                </div>
                <CrousalScore craData={craData} />
            </div>
        </div>
    )
}
