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

export default function TecherFilog({ setData }) {



    const [academicYear, setAcademicYear] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState()

    const [techer_name, setTcname] = useState("")
    const [techer_dob, setTcDob] = useState("")
    const [techer_qualification, setTcqualification] = useState("")
    const [techer_phone_no, setTcPhone] = useState("")
    const [techer_address, setTcAddress] = useState("")
    const [techer_joining_date, setTcjDate] = useState("")





    const handleAddStudent = async () => {
        const res = await fetch("/api/admin/techer", {
            method: "POST",
            body: JSON.stringify({ techer_name, techer_dob, techer_qualification, techer_phone_no, techer_address, techer_joining_date })
        })
        // const data = await res.json()
        if (!res.status === 200) {
            return alert("data error")
        }
        // return alert("data added")
        return 
        // return alert("data saved")
    }




    return (
        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="default"> Add Techer</Button>} />
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Add Techer</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className={"flex"}>
                        <FieldGroup >
                            <Field>
                                <Label htmlFor="name-1">Techer Name</Label>
                                <Input value={techer_name} onChange={(e) => setTcname(e.target.value)} id="name-1" placeholder="Enter Name" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Techer Dob</Label>
                                <Input value={techer_dob} onChange={(e) => setTcDob(e.target.value)} id="name-1" placeholder="Enter eg.. 2026-2027" type={"date"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Techer Qualification</Label>
                                <Input value={techer_qualification} onChange={(e) => setTcqualification(e.target.value)} id="name-1" placeholder="Enter eg.. 2026-2027" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Phone No</Label>
                                <Input value={techer_phone_no} onChange={(e) => setTcPhone(e.target.value)} id="name-1" placeholder="Enter eg.. 2026-2027" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Techer Address</Label>
                                <Input value={techer_address} onChange={(e) => setTcAddress(e.target.value)} id="name-1" placeholder="Enter eg.. 2026-2027" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="name-1">Joining Date</Label>
                                <Input value={techer_joining_date} onChange={(e) => setTcjDate(e.target.value)} id="name-1" placeholder="Enter eg.. 2027" type={"date"} />
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
