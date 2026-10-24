"use client"
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'


import React, { useEffect, useState } from 'react'

import AcademicDilog from './dilog/AcademicDilog'

export default function Studetnheader({ setData, Tabs, setActive, active,setRgdata }) {



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
          <AcademicDilog setData={setData} />
          {/* <AdmissionDilog addclass={addclass}/> */}
        </div>
        
      </div>
    </div>
  )
}
