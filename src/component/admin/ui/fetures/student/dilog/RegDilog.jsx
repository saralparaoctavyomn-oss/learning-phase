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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

export default function RegDilog({ setRgdata }) {

    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [emailId, setEmail] = useState('')
    const [className, setClassName] = useState("")
    const [nationality, setNatiionality] = useState("")
    const [cast, setCast] = useState("")
    const [academicList, setAcademicList] = useState([]);

    const [selectedAcademic, setSelectedAcademic] = useState("");

    const handleAddStudent = async () => {
        const res = await fetch("/api/admin/student/registration", {
            method: "POST",
            body: JSON.stringify({ name, dob, gender, fatherName, motherName, address, phoneNo, emailId, classId: className, nationality, cast,academicyear:selectedAcademic })
        })
        const data = await res.json()
        if (!data.status === 200) {
            return alert("data error")
        }
        // return alert("data added")
        return setRgdata((prv) => [...prv, data.data])
        // return alert("data saved")
    }


    const [addclass, setAddclass] = useState([])
    const handelGetAcademyYear = async () => {
        const res = await fetch("/api/admin/academic", {
            method: "GET"
        })
        const data = await res.json()
        if (!data.status === 200) {
            return console.log("network error")
        }
        return setAcademicList(data.data)
    }

    useEffect(() => {
        const handelGetclass = async () => {
            const res = await fetch("/api/admin/class/by-add-student", {
                method: "GET"
            })
            const data = await res.json()
            if (!data.status === 200) {
                return console.log("network error")
            }
            return setAddclass(data.data)
        }
        handelGetAcademyYear()
        handelGetclass()
    }, [])

    return (
        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="outline">Registration Now</Button>} />
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className={"grid grid-cols-2"}>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="username-1">Name</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} id="username-1" placeholder="Enter Student Name" type={"text"} />
                            </Field>
                            <Field >
                                <Label htmlFor="name-1">Date of Birth</Label>
                                <Input value={dob} onChange={(e) => setDob(e.target.value)} id="name-1" type={"date"} />
                            </Field>
                            <Field >
                                <Label htmlFor="name-1">Gender</Label>
                                <Input value={gender} onChange={(e) => setGender(e.target.value)} id="name-1" type={"text"} />
                            </Field>
                            <Field >
                                <Label htmlFor="name-1">Nationality</Label>
                                <Input value={nationality} onChange={(e) => setNatiionality(e.target.value)} id="name-1" type={"text"} />
                            </Field>
                            <Field >
                                <Label htmlFor="name-1">Cast</Label>
                                <Input value={cast} onChange={(e) => setCast(e.target.value)} id="name-1" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Class</Label>
                                <Select addclass={addclass} value={className} onValueChange={setClassName}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Fruits</SelectLabel> */}
                                            {addclass?.map((item) => (
                                                /* 
                                                  2. The 'value' is what your state captures (the unique ID).
                                                     The content inside the tag is what the user sees in the dropdown and input box.
                                                */
                                                <SelectItem key={item.id} value={String(item.id)}>
                                                    {item.class_name}th ||  Section {item.section_name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {/* <Input value={className} onChange={(e) => setClassName(e.target.value)} id="username-1" placeholder="Enter Class" type={"number"} /> */}
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Father Name</Label>
                                <Input value={fatherName} onChange={(e) => setFatherName(e.target.value)} id="name-1" placeholder="Enter Father Name" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Mother Name</Label>
                                <Input value={motherName} onChange={(e) => setMotherName(e.target.value)} id="username-1" placeholder="Enter Mother Name" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Phone No</Label>
                                <Input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} id="username-1" placeholder="Enter Phone No" type={"number"} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Email Id</Label>
                                <Input value={emailId} onChange={(e) => setEmail(e.target.value)} id="username-1" placeholder="Enter Email " type={"email"} />
                            </Field>
                            <Field >
                                <Label htmlFor="name-1">Address</Label>
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} id="name-1" placeholder="Enter Address" type={"text"} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Class</Label>
                                <Select value={selectedAcademic} onValueChange={setSelectedAcademic}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select academic year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* Map over the list array instead of the selected value */}
                                            {Array.isArray(academicList) && academicList.map((item) => (
                                                <SelectItem key={item?.ac_id} value={String(item?.ac_id)}>
                                                    {DateTime.fromISO(item?.start_date).year} - {DateTime.fromISO(item?.end_date).year}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {/* <Input value={className} onChange={(e) => setClassName(e.target.value)} id="username-1" placeholder="Enter Class" type={"number"} /> */}
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
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
