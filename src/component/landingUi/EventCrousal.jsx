import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function EventCrousal({ craData }) {
    if (!craData || craData.length === 0) {
        return null
    }

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full "
        >
            <CarouselContent>
                {craData.map((data, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/4">
                        <div className="h-[400px] flex flex-col gap-3">
                            {/* <div className={`top-score  ${data.text} px-4 ${data.color} h-fit`}>
                                <h1 className='text-3xl font-bold'>{data.score}</h1>
                                <p>{data.board}</p>
                            </div> */}
                            <Image
                                src={data.src}
                                alt={data.alt || `Slide ${index + 1}`}
                                width={500}
                                height={500}
                                className="object-cover w-full h-full"
                            />
                            <div className="names">
                                <h1 className='uppercase font-bold text-[18px]'>{data.name}</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
