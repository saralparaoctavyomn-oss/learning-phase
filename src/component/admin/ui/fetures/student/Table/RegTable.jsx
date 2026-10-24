import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DateTime } from "luxon"

export function RegTable({ regData, handelDelete }) {
    //   console.log(regData)

    const date = DateTime.now()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Reg id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Class</TableHead>

                    <TableHead>Section</TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {!regData || regData?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-gray-500 font-medium">
                            Don't have any data
                        </TableCell>
                    </TableRow>
                ) : (
                    regData?.map((data, index) => (
                        <TableRow key={data.id || index}>
                            <TableCell className="font-medium">{data.st_id}</TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>  {Math.floor(
                                DateTime.now().diff(DateTime.fromISO(data.dob), 'years').years
                            )}</TableCell>
                            <TableCell>{data.gender}</TableCell>

                            <TableCell>{data.class_name}</TableCell>
                            <TableCell>{data.section_name}</TableCell>
                            <TableCell className={data.status === 1? "text-green-400": "text-red-400"}>{data.status === 1? "Success": "Pending"}</TableCell>

                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                            <div className={"border-none"} onClick={(e) => handelDelete(data.registration_number)}>Delete</div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
