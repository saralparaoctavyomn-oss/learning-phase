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

export function TecherTable({ setData, handelDelete }) {
  //   console.log(newdata)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Techer Name</TableHead>
          <TableHead> Techer Qualification</TableHead>
          <TableHead> Techer DOB</TableHead>
          <TableHead> Joining Date</TableHead>
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
            <TableRow key={data.id || index}>
              <TableCell className="font-medium">{data?.techer_name}</TableCell>
              <TableCell className="font-medium">{data?.techer_qualification}</TableCell>
              <TableCell>{DateTime.fromISO(data?.techer_dob).toFormat("yyyy-MM-dd")}</TableCell>
              <TableCell>{DateTime.fromISO(data?.techer_joining_date).toFormat("yyyy-MM-dd")}</TableCell>

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
                      <div className={"border-none"} onClick={(e) => handelDelete(data.id)}>Delete</div>
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
