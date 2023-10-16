"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";

import { BillboardColumn, columnsBillboard } from "./colums-billboard";
import { DataTable } from "./data-table";

import ApiList from "./api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="Manage billboard for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columnsBillboard} data={data} searchItem="label" />

      <Heading title="Api's" description="API calls for billboards" />
      <Separator />
      <ApiList
        storeId={`${params.storeId}`}
        dataId="billboardId"
        dataName="billboards"
        title="BILLBORDS"
        titleById="BILLBOARD"
      />
    </>
  );
};

export default BillboardClient;
