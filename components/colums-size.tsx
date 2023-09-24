"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action-billboard";
import CellActionSize from "./cell-action-size";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columnsSizes: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionSize data={row.original} />,
  },
];
