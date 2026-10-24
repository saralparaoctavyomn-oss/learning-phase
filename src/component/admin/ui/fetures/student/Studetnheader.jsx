"use client"
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'


import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import RegDilog from './dilog/RegDilog'
import AdmissionDilog from './dilog/AdmissionDilog'

export default function Academicheader({ setData, Tabs, setActive, active,setRgdata }) {



  const [rollNo, setRollno] = useState("")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [motherName, setMotherName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [emailId, setEmail] = useState('')
  const [className, setClassName] = useState("")
  const [section, setSection] = useState("")


  const handleAddStudent = async () => {
    const res = await fetch("/api/getpost", {
      method: "POST",
      body: JSON.stringify({ rollNo, name, dob, fatherName, motherName, address, className, section, phoneNo, emailId })
    })
    const data = await res.json()
    if (!data.status === 200) {
      return alert("data error")
    }
    // return alert("data added")
    return setData((prv) => [...prv, data.data])
    // return alert("data saved")
  }


  const [addclass, setAddclass] = useState([])

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
    handelGetclass()
  }, [])

  const type = [
    {
      id: 1,
      label: ""
    }
  ]
  const handelActive = (label) => {
    setActive(label)
  }
  return (
    <div className='w-full flex flex-col justify-between p-4 items-center border-b '>
      <div className="w-full flex justify-between">
        <div className="left">
          <Field>
            {/* <FieldLabel htmlFor="input-demo-api-key">Search</FieldLabel> */}
            <Input id="input-demo-api-key" className={"m-0 p-0"} type="text" placeholder="Find Student" />
          </Field>
        </div>

        <div className="dilog-button flex gap-4">
          <RegDilog addclass={addclass} setRgdata={setRgdata}/>
          <AdmissionDilog addclass={addclass}/>
        </div>
        {/* <Dialog>
          <form>
            <DialogTrigger render={<Button variant="default">Add Student</Button>} />
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
                    <Label htmlFor="name-1">Roll No</Label>
                    <Input value={rollNo} onChange={(e) => setRollno(e.target.value)} id="name-1" placeholder="Enter Roll No" type={"number"} />
                  </Field>
                  <Field>
                    <Label htmlFor="username-1">Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} id="username-1" placeholder="Enter Student Name" type={"text"} />
                  </Field>
                  <Field >
                    <Label htmlFor="name-1">Date of Birth</Label>
                    <Input value={dob} onChange={(e) => setDob(e.target.value)} id="name-1" type={"date"} />
                  </Field>
                  <Field>
                    <Label htmlFor="username-1">Class</Label>
                    <Select addclass={addclass} value={className} onValueChange={setClassName}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {addclass?.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.class_name}th ||  Section {item.section_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
        </Dialog> */}
      </div>
      <div className="bottom-section mt-4 w-full flex items-start gap-4">
        {Tabs?.map((item, index) => (
          <Button key={index} className={`
      ${active === item.label
              ? `${item.color} hover:${item.color}`
              : "bg-transparent text-black border border-input hover:bg-accent"
            }
    `} onClick={(e) => setActive(item.label)}>{item.label}</Button>

        ))}

      </div>
    </div>
  )
}
