"use client";

import { BillboardColumn } from "./colums-billboard";
import { Button } from "./ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/alert-model";
import axios from "axios";
import { CategoryColumn } from "./colums-category";
import { SizeColumn } from "./colums-size";

interface CellActionProps {
  data: CategoryColumn;
}

const onCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied To CLipboard");
};

const CellActionCategory: React.FC<CellActionProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${data.id}`, {
        data: {
          storeId: params.storeId,
          billboardId: data.id,
        },
      });
      router.refresh();
      toast.success("Category Removed");
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="h-8 w-8 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuLabel
            className="flex hover:cursor-pointer"
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-3 h-4 w-4" />
            Update
          </DropdownMenuLabel>
          <DropdownMenuLabel
            className="flex hover:cursor-pointer"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-3 h-4 w-4" />
            Copy Id
          </DropdownMenuLabel>
          <DropdownMenuLabel
            className="flex hover:cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-3 h-4 w-4" />
            Delete
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionCategory;
