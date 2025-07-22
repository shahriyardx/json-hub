import DashboardLayout from "@/components/layouts/dashboard-layout"
import { api } from "@/utils/api"
import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { JsonResponse } from "@/types/json"
import { DataTable } from "@/components/ui/data-table"
import { sortByName } from "@/utils/sort"

const AllJson = () => {
  const { data: batches } = api.batch.all.useQuery()
  const { data, refetch } = api.assignmentJson.allAdmin.useQuery()

  const { mutate: deleteJson } = api.assignmentJson.delete.useMutation({
    onSuccess: () => {
      toast.success("Json deleted")
      refetch()
    },
  })

  console.log(data)

  const columns: ColumnDef<JsonResponse>[] = [
    {
      accessorKey: "batch",
      header: "Batch",
      cell: ({ row }) => {
        return <span>{row.original.batch.name}</span>
      },
    },
    {
      accessorKey: "batchId",
      header: "Batch ID",
    },
    {
      accessorKey: "assignment",
      header: "Assignment",
      cell: ({ row }) => {
        return <span>{row.original.assignment.name}</span>
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/jsons/${row.original.id}`}>Edit</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this json.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteJson({ id: row.original.id })}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: {
        batchId: false,
      },
    },
  })

  return (
    <DashboardLayout title="All Json">
      <div>
        <Select
          onValueChange={(val) => {
            if (val === "all") {
              table.getColumn("batchId")?.setFilterValue(undefined)
            } else {
              table.getColumn("batchId")?.setFilterValue(val)
            }
          }}
        >
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {batches?.sort(sortByName).map((batch) => (
              <SelectItem value={batch.id} key={batch.id}>
                {batch.name}
              </SelectItem>
            ))}
          </SelectContent> 
        </Select>
        <DataTable table={table} />
      </div>
    </DashboardLayout>
  )
}

export default AllJson
