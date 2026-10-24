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
import React, { useState } from 'react'

export default function ClassHeader({ setData }) {
  const [className, setClassName] = useState("")
  const [section, setSection] = useState("")

  const handleAddStudent = async () => {
    const res = await fetch("/api/admin/class", {
      method: "POST",
      body: JSON.stringify({ className,section })
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
    <div className='w-full flex justify-between p-4 items-center border-b '>
      <div className="left">
        <Field>
          {/* <FieldLabel htmlFor="input-demo-api-key">Search</FieldLabel> */}
          <Input id="input-demo-api-key" className={"m-0 p-0"} type="text" placeholder="Find Student" />
        </Field>
      </div>
      <Dialog>
        <form>
          <DialogTrigger render={<Button variant="default">Add Student</Button>} />
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create Class</DialogTitle>
              <DialogDescription>
                Make changes to your Class here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className={"grid"}>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Class</Label>
                  <Input value={className} onChange={(e) => setClassName(e.target.value)} id="name-1"  type={"number"} />
                </Field>
                <Field>
                  <Label htmlFor="username-1">Section</Label>
                  <Input value={section} onChange={(e) => setSection(e.target.value)} id="username-1" type={"text"} />
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
    </div>
  )
}
