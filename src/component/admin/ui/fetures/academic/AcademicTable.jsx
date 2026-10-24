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

export function AcademicTable({ setData, handelDelete }) {
  //   console.log(newdata)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Academic Year</TableHead>
          <TableHead> Stat Year</TableHead>
          <TableHead> End Year</TableHead>

          <TableHead>Is Active</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!setData || setData?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-gray-500 font-medium">
              Don't have any data
            </TableCell>
          </TableRow>
        ) : (
          setData?.map((data, index) => (
            <TableRow key={data.ac_id || index}>
              <TableCell className="font-medium">{data.ac_year}</TableCell>
              <TableCell>{DateTime.fromISO(data.start_date).year}</TableCell>
              <TableCell>{DateTime.fromISO(data.end_date).year}</TableCell>

              <TableCell className={`${data.is_Active === 1 ? "text-green-400" : "text-red-400"}`}>{data.is_Active === 1 ? "Active" : "Inactive"}</TableCell>

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
                      <div className={"border-none"} onClick={(e) => handelDelete(data.ac_id)}>Delete</div>
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
