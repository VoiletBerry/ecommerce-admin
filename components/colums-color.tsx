"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionSize from "./cell-action-size";
import CellActionColor from "./cell-action-color";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columnsColors: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        {row.original.value}{" "}
        <div
          className="h-6 w-6 border rounded-md"
          style={{ backgroundColor: row.original.value }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionColor data={row.original} />,
  },
];
