"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "./data-table";

import ApiList from "./api-list";

import { ColorColumn, columnsColors } from "./colums-color";

interface SizeClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columnsColors} data={data} searchItem="name" />
      <Heading title="Api's" description="API calls for colors" />
      <Separator />
      <ApiList
        storeId={`${params.storeId}`}
        dataId="colorId"
        dataName="colors"
        title="COLORS"
        titleById="COLOR"
      />
    </>
  );
};

export default ColorClient;
