"use client"
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"


import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'

export default function AcademicDilog({ setData }) {



    const [academicYear, setAcademicYear] = useState("")
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] =useState()




    const handleAddStudent = async () => {
        const res = await fetch("/api/admin/academic", {
            method: "POST",
            body: JSON.stringify({academicYear,startDate,endDate })
        })
        const data = await res.json()
        if (!data.status === 200) {
            return alert("data error")
        }
        // return alert("data added")
        return setData((prv) => [...prv, data.data])
        // return alert("data saved")
    }




    return (
        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="default"> Add Academic</Button>} />
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Academic Year</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className={"flex"}>
                        <FieldGroup >
                            <Field>
                                <Label htmlFor="name-1">Academic Year</Label>
                                <Input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} id="name-1" placeholder="Enter eg.. 2026-2027" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Start Date</Label>
                                <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} id="name-1" placeholder="Enter eg.. 2026" type={"date"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Ending Date</Label>
                                <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} id="name-1" placeholder="Enter eg.. 2027" type={"date"} />
                            </Field>

                        </FieldGroup>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" onClick={(e) => handleAddStudent()}>Add Now</Button>
                    </DialogFooter>
                </DialogContent>
            </form>

        </Dialog>
    )
}
