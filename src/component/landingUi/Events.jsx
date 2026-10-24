import React from 'react'
import EventCrousal from './EventCrousal'
import { Button } from '@/components/ui/button'

export default function Events() {
    const craData = [
        {
            id: 1,
            src: "/class.webp",
            name: "Academic Festival"
        },
        {
            id: 2,
            src: "/class.webp",
            name: "Academic Festival"

        },
        {
            id: 3,
            src: "/class.webp",
            name: "Academic Festival"

        },
        {
            id: 4,
            src: "/class.webp",
            name: "Academic Festival"

        },
        {
            id: 5,
            src: "/class.webp",
            name: "Academic Festival"

        },
    ]
    return (
        <div className='campus-main w-full flex justify-center items-center py-10'>
            <div className="campus-contnet w-full max-w-[1200px]">
                <div className="top-section w-full flex items-start gap-16 py-8">
                    <h1 className='uppercase font-bold text-3xl'>Our Events</h1>
                    <div className="right max-w-[600px] grid gap-4">
                        <p>Sacred Heart School is delighted of its modern amenities and facilities designed specifically to allow students to excel academically, socially, and physically. </p>
                        <Button className={"w-fit"}>Explore Events</Button>
                    </div>
                </div>
                <EventCrousal craData={craData} />
            </div>
        </div>
    )
}
