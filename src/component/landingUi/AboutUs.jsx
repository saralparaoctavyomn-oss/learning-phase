import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
    return (
        <div className='about w-full flex justify-center items-center h-fit py-24'>
            <div className="about-content grid md:grid-cols-2 w-full max-w-[1200px] flex-start flex gap-8 justify-between">
                <div className="left w-full  max-w-[600px] h-fit">
                    <h2 className='uppercase text-4xl font-bold'><span className='text-gray-300'>About</span> baby's nurssury school</h2>
                    <p className='text-justify'>Hii we are see <span>BABY'S NURSSERY SCHOLL </span> In Assam Kokrajhad and we tech best in Assam so you dont street to think your baby we tech better life better future so if you admit your baby so you'r strees free Gurdian.
                        At Baby's Nurssuery School, we are committed to nurturing confident, conscious, and compassionate young individuals. Our mission is to develop students who act as catalysts for positive change, contributing to society by harmoniously integrating human, spiritual, personal, and social values into their lives.</p>
                    <div className="buttons py-8 flex gap-4">
                        <Button > Explore Now</Button>
                        <Button variant='outline'> Our Vision</Button>
                    </div>
                </div>
                <div className="right w-full max-w-[500px] h-[400px]">
                    <Image src={"/scholl-view.jpg"} width={500} height={500} className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}
