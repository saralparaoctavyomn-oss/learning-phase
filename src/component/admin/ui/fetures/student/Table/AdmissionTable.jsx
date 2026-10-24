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

export function AdmistionTable({ adminData, handelDelete }) {
  //   console.log(newdata)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Roll No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Dob</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Section</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!adminData || adminData?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-gray-500 font-medium">
              Don't have any data
            </TableCell>
          </TableRow>
        ) : (
          adminData.map((data, index) => (
            <TableRow key={data.id || index}>
              <TableCell className="font-medium">{data.roll_no}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>
                {DateTime.fromISO(data.dob).toFormat('yyyy-MM-dd')}
              </TableCell>
              <TableCell>{data.class_name}</TableCell>
              <TableCell>{data.section_name}</TableCell>

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
