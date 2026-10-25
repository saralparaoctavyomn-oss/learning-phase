import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function ManageMent() {
    return (
        <div className='campus-main w-full flex justify-center items-center py-10'>
            <div className="campus-contnet w-full max-w-[1200px]">
                <div className="top-section w-full flex flex-col  justify-center text-center gap-4 py-4 items-center">
                    <h1 className='uppercase font-bold text-3xl'>our ManageMent</h1>
                    <div className="right max-w-[600px] grid ">
                        <p>Sacred Heart School is delighted of its modern amenities and facilities designed specifically to allow students to excel academically, socially, and physically. </p>
                    </div>
                    <Button className={"w-fit"}>Contact Now</Button>

                </div>
                <div className="management-grid grid md:grid-cols-2 gap-6">
                    <div className="left h-[500px] relative">
                        <Image src={"/principle.webp"} width={500} height={500} className='w-full h-full object-cover' />
                        <div className="contetn text-4xl flex font-bold absolute bottom-0 p-4 bg-black/60 backdrop-blur-sm text-white w-full">
                            <div className="left">
                                <h1 className='uppercase'>DIRECTOR</h1>
                                <h2 className='text-2xl'>Dr Ramprashad Sastri</h2>
                            </div>
                            <div className="right text-sm max-w-[300px] font-normal">
                                <p>I have a big drem to succes anytime with new face not me it's my student's </p>
                            </div>
                        </div>
                    </div>
                    <div className="left h-[500px] relative">
                        <Image src={"/principle.webp"} width={500} height={500} className='w-full h-full object-cover' />
                        <div className="contetn text-4xl flex font-bold absolute bottom-0 p-4 bg-black/60 backdrop-blur-sm text-white w-full">
                            <div className="left">
                                <h1 className='uppercase'>Principal</h1>
                                <h2 className='text-2xl'>Dr Ramprashad Sastri</h2>
                            </div>
                            <div className="right text-sm max-w-[300px] font-normal">
                                <p>I have a big drem to succes anytime with new face not me it's my student's </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <CrousalMain craData={craData} /> */}
            </div>
        </div>
    )
}
