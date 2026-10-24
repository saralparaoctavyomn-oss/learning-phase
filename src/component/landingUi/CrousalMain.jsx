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

export default function CrousalMain({ craData }) {
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
                        <div className="h-[400px]">
                            <Image
                                src={data.src}
                                alt={data.alt || `Slide ${index + 1}`}
                                width={500}
                                height={500}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
