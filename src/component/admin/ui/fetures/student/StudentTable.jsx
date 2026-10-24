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

export function StudetnTable({ newdata,handelDelete }) {
  // console.log(newdata)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reg Id</TableHead>
          <TableHead>Roll No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Status</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!newdata || newdata.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-gray-500 font-medium">
              Don't have any data
            </TableCell>
          </TableRow>
        ) : (
          newdata.map((data, index) => (
            <TableRow key={data.id || index}> 
              <TableCell className="font-medium">{data.reg_id}</TableCell>
              <TableCell className="font-medium">{data.roll_no ? data.roll_no: "Please Addmission Now"}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{DateTime.fromISO(data.dob).toFormat("yyyy-MM-dd")}</TableCell>
              <TableCell>{data.class_name}</TableCell>
              <TableCell>{data.section_name}</TableCell>
              <TableCell className={data.status ===1 ? "text-green-400": "text-red-400"}>{data.status === 1 ? "Success": "Pending"}</TableCell>

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
                      <div className={"border-none"} onClick={(e)=>handelDelete(data.registration_number)}>Delete</div>
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
