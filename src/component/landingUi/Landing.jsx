import { Button } from '@/components/ui/button'
import React from 'react'

export default function Landing() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden flex justify-center items-center bg-black">
            {/* Background Video with absolute positioning to cover full screen properly */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/13491650_3840_2160_50fps.mp4" type="video/mp4" />
            </video>

            {/* Overlay Content Box */}
            <div className="bottom absolute bg-black/90 backdrop-blur-md text-white w-full max-w-[1200px] p-8 bottom-0 md:bottom-6">
                <div className="botom-content flex flex-col w-full justify-between md:flex-row gap-4">
                    <div className="left w-full uppercase text-3xl max-w-[400px]">
                        <h2>Best Baby's Scholl in Kokrajhad</h2>
                        <p className='text-[14px] lowercase leading-tight'>Hii There we have many Exprinece techer here we promised your baby rech intelligence and make happy you</p>
                    </div>
                    <div className="right flex gap-4">
                        <Button variant='outline'>Enquery Now</Button>
                        <Button variant='outline' className={"bg-yellow-500 border-none"}>Fill Admission Form</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}