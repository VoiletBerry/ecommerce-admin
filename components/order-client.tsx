"use client";


import Heading from "./Heading";
import { Separator } from "./ui/separator";
import { DataTable } from "./data-table";
import ApiList from "./api-list";
import { OrderColumn, columnsOrders } from "./colums-order";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Order (${data.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />

      <DataTable columns={columnsOrders} data={data} searchItem="name" />
    </>
  );
};

export default OrderClient;
