"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "./data-table";

import ApiList from "./api-list";

import { SizeColumn, columnsSizes } from "./colums-size";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${data.length})`}
          description="Manage Sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columnsSizes} data={data} searchItem="name" />
      <Heading title="Api's" description="API calls for sizes" />
      <Separator />
      <ApiList
        storeId={`${params.storeId}`}
        dataId="sizeId"
        dataName="sizes"
        title="SIZES"
        titleById="SIZE"
      />
    </>
  );
};

export default SizeClient;
