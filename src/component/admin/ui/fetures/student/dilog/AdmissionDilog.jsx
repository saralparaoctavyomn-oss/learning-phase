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
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import AdmissionSuccess from '@/component/admin/falbackUi/AdmissionSuccess'


export default function AdmissionDilog() {

    const [step, setStep] = useState(0)
    const [currentStudent, setCurrentStudent] = useState("")
    const [ammount, setAmmount] = useState("")
    const [adData, setAddata] = useState([])


    const handleAddStudent = async () => {
        const res = await fetch("/api/admin/student/admission", {
            method: "POST",
            body: JSON.stringify({ currentStudent, appprovedBy, type, pyMethod, ammount })
        })
        const data = await res.json()
        if (res.status === 400) {
            return alert(data.message)
        } else if (res.status === 500) {
            return alert(data.message)
        }

        setAddata(data.payment)
        setResdata(data.resData)
        setStep(0)


        return setsucces(true)
        // return alert("data added")

        // return alert("data saved")
    }


    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("")
    const [appprovedBy, setApprovedby] = useState("")
    const [pyMethod, setPymethod] = useState("")
    const [succes, setsucces] = useState(false)
    const [resData, setResdata] = useState([])

    useEffect(() => {
        // If the input is empty, clear results and don't fetch
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        // Set up a debounce timer (waits 400ms after user stops typing to fetch)
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                // Replace with your actual API route or backend endpoint
                const res = await fetch(`/api/admin/student/search?query=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();

                setResults(data); // Assuming your API returns an array of students
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            } finally {
                setLoading(false);
            }
        }, 400);

        // Cleanup the timeout if user types again before 400ms
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handelNext = () => {
        if (step === 0) {
            if (!currentStudent) {
                setCurrentStudent(JSON.stringify(results[0]))
            }
            setStep((prv) => prv + 1)
            return setCurrentStudent(JSON.stringify(results[0]))

        } else {
            setStep((prv) => prv - 1)
        }
    }
    const handleClear = () => {
        setAddata("");
        setAmmount("");
        setApprovedby("");
        setPymethod("");
        setStep(0);               // 1. Fix: Reset step back to 0 so the first screen shows up
        setType("");
        setsucces(false);         // 2. Fix: Set default boolean state
        setCurrentStudent([]);
        setSearchQuery("");
        // If you have a state for search results, clear it here too:
        // setResults([]); 
    };


    const AdType = [
        {
            id: 1,
            Label: "Online",
            value: "online"
        },
        {
            id: 1,
            Label: "Offline",
            value: "offline"
        }
    ]
    const paymentMethod = [
        {
            id: 1,
            Label: "UPI",
            value: "upi",
        },
        {
            id: 2,
            Label: "CARD",
            value: "card",
        },
        {
            id: 3,
            Label: "Cash",
            value: "cash",
        },

    ]
    return (
        <Dialog>
            {succes === true ? (
                <DialogContent className="sm:max-w-[800px]">
                    <AdmissionSuccess data={adData} crData={currentStudent} resData={resData} />
                </DialogContent>
            ) : (<form>
                <DialogTrigger render={<Button variant="default">Admission Now</Button>} />
                <DialogContent className="sm:max-w-[800px]">

                    {step === 0 && (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Search Student</DialogTitle>
                                <DialogDescription>
                                    Search Using Student Id or Registration ID
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup className={"grid grid-cols-2 py-4"}>
                                <FieldGroup>
                                    <Field >
                                        <Label htmlFor="name-1">Search Here</Label>
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            id="search-input"
                                            placeholder="Enter Student ID or Registration ID"
                                            type="text"
                                        />
                                    </Field>
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-2">Results</h3>
                                        {loading && <p className="text-sm text-gray-500">Searching...</p>}

                                        {!loading && results.length > 0 && (
                                            <ul className="divide-y border rounded-lg p-4 hover:bg-gray-300">
                                                {results.map((student) => (
                                                    <li key={student.st_id} className="py-2 flex gap-2 items-center">
                                                        <div className="round-logo w-10 h-10 bg-gray-300 flex justify-center items-center rounded-full">
                                                            <p>{student.name.slice(0, 1)}</p>
                                                        </div>
                                                        <div className="grid ">
                                                            <span className='text-2xl'>{student.name}</span>
                                                            <span className="text-gray-500 text-[8px]">
                                                                ST ID: {student.st_id} <br /> REG ID: {student.reg_id}
                                                            </span>
                                                        </div>

                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {!loading && searchQuery && results.length === 0 && (
                                            <p className="text-gray-500">No student found.</p>
                                        )}
                                    </div>
                                </FieldGroup>
                            </FieldGroup>
                        </div>

                    )}

                    {step === 1 && (
                        <FieldGroup className={"grid grid-cols-2"}>

                            <FieldGroup>
                                <Select type={type} value={type} onValueChange={setType}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Fruits</SelectLabel> */}
                                            {AdType?.map((item, index) => (
                                                /* 
                                                  2. The 'value' is what your state captures (the unique ID).
                                                     The content inside the tag is what the user sees in the dropdown and input box.
                                                */
                                                <SelectItem key={index} value={String(item.value)}>
                                                    {item.Label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select pyMethod={pyMethod} value={pyMethod} onValueChange={setPymethod}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>Fruits</SelectLabel> */}
                                            {paymentMethod?.map((item, index) => (
                                                /* 
                                                  2. The 'value' is what your state captures (the unique ID).
                                                     The content inside the tag is what the user sees in the dropdown and input box.
                                                */
                                                <SelectItem key={index} value={String(item.value)}>
                                                    {item.Label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Field >
                                    <Label htmlFor="name-1">Approved By</Label>
                                    <Input value={appprovedBy} onChange={(e) => setApprovedby(e.target.value)} id="name-1" placeholder="" type={"text"} />
                                </Field>
                                <Field >
                                    <Label htmlFor="name-1">Approved By</Label>
                                    <Input value={ammount} onChange={(e) => setAmmount(e.target.value)} id="name-1" placeholder="" type={"number"} />
                                </Field>
                            </FieldGroup>
                            <FieldGroup>
                            </FieldGroup>
                        </FieldGroup>
                    )}



                    {step === 0 && (
                        <DialogFooter>
                            <Button variant="outline" onClick={(e) => handleClear()}>Clear</Button>
                            <Button type="submit" onClick={(e) => handelNext()}>Next</Button>
                        </DialogFooter>
                    )}
                    {step === 1 && (
                        <DialogFooter>
                            <Button variant="outline" onClick={(e) => handelNext()}>Back</Button>
                            <Button type="submit" onClick={(e) => handleAddStudent()}>Add Now</Button>
                        </DialogFooter>
                    )}

                </DialogContent>
            </form>)}


        </Dialog>
    )
}
