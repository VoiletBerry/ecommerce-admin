"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionBillboard from "./cell-action-billboard";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columnsBillboard: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionBillboard data={row.original} />,
  },
];
