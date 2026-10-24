import React from 'react'
import CrousalMain from './CrousalMain'
import { Button } from '@/components/ui/button'

export default function AcademicView() {
    const craData = [
        {
            id: 1,
            src: "/scholl-view.jpg"
        },
        {
            id: 2,
            src: "/scholl-view.jpg"
        },
        {
            id: 3,
            src: "/scholl-view.jpg"
        },
        {
            id: 4,
            src: "/scholl-view.jpg"
        },
        {
            id: 5,
            src: "/scholl-view.jpg"
        },
    ]
    return (
        <div className='campus-main w-full flex justify-center items-center py-10'>
            <div className="campus-contnet w-full max-w-[1200px]">
                <div className="top-section w-full flex items-start gap-16 py-8">
                    <h1 className='uppercase font-bold text-3xl'>Academics View</h1>
                    <div className="right max-w-[600px] grid gap-4">
                        <p>Sacred Heart School is delighted of its modern amenities and facilities designed specifically to allow students to excel academically, socially, and physically. </p>
                        <Button className={"w-fit"}>Explore More</Button>
                    </div>
                </div>
                <CrousalMain craData={craData} />
            </div>
        </div>
    )
}
