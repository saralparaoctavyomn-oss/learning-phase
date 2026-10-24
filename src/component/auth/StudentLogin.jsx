"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { DateTime } from 'luxon'


export default function Adminlogin() {
  const [combineData, setCombineData] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const handelSubmit = async () => {
    const res = await fetch("/api/auth/student", {
      method: "POST",
      body: JSON.stringify({ combineData, password })
    })
    const data = await res.json()
    if (res.status === 200) {
      const date = DateTime.now()
      router.push(`/student?srcId=${data.srcId}&loginTime=${date}`)
    } else if (res.status === 400) {
      return alert(data.message)
    } else if (res.status === 500) {
      return alert(data.message)
    } else if (res.status === 404) {
      return alert(data.message)
    }
    return router.refresh()
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full justify-center h-screen items-center'>
      <div className="left-content h-screen w-full bg-gray-100 hidden lg:flex">

      </div>
      <div className="right-content px-8 w-full ">
        <div className="top-content ">
          <h1 className='uppercase font-bold text-2xl'>student login</h1>
          <p className='text-gray-500'>Enter Your Credential</p>
        </div>
        <div className="center-contnet grid gap-4 py-8">
          <Field>
            <Label>Enter your Email || Student Id</Label>
            <Input value={combineData} onChange={(e) => setCombineData(e.target.value)} type={"text"} placeholder={"Enter your Student Id Or Email Id"} />
          </Field>
          <Field>
            <Label>Enter your Password </Label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder={"Enter Your Password"} />
          </Field>

          <Button onClick={(e) => handelSubmit()} variant='default'>Submit</Button>
        </div>
      </div>
    </div>
  )
}
