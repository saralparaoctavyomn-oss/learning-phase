"use client"
import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
    const links = [
        {
            id: 1,
            label: "Home",
            src: "/"
        },
        {
            id: 1,
            label: "About",
            src: "/"
        },
        {
            id: 1,
            label: "Academic",
            src: "/"
        },
        {
            id: 1,
            label: "Resources",
            src: "/"
        },
        {
            id: 1,
            label: "Alumni",
            src: "/"
        },
        {
            id: 1,
            label: "campus",
            src: "/"
        },
        {
            id: 1,
            label: "Contact",
            src: "/"
        }
    ]
    const [active,setActive] = useState("Home")

    return (
        <div className='w-full flex justify-center items-center fixed z-10 p-0 mt-2 '>
            <div className="header-nav bg-black p-3  text-white w-full flex justify-between relative max-w-[1200px] items-center " >
                <div className="left uppercase flex items-center gap-2 font-bold text-2xl">
                    <GraduationCap />
                    <h1 >BabySchool</h1>
                    <p className='text-[12px] lowercase font-normal leading-tight hidden md:flex'>Baby's future Entry School <br />
                        for learn everything </p>
                </div>
                <div className="center flex gap-4  text-sm hidden md:flex">
                    {
                        links?.map((data, index) => (
                            <Link key={index} className={`${data.label === active ? "text-white underline underline-offset-8": "text-gray-300 hover:underline hover:underline-offset-8 transition-all duration-300 hover:text-white"}`} href={"/"}>{data.label}</Link>

                        ))
                    }
                </div>
                <div className="right  items-center gap-4 hidden md:flex">
                    <Button variant='outline' className={"transition-all duration-200 cursor-pointer"}>Login</Button>
                    <Button variant='default' className={"bg-white text-black hover:bg-gray-100 cursor-pointer"}>Admission Now</Button>
                </div>
            </div>
        </div>
    )
}
