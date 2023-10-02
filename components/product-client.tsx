"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "./data-table";

import ApiList from "./api-list";
import { ProductColumn, columnsProduct } from "./colums-product";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columnsProduct} data={data} searchItem="name" />

      <Heading title="Api's" description="API calls for products" />
      <Separator />
      <ApiList
        dataId="productId"
        dataName="productss"
        title="PRODUCTS"
        titleById="PRODUCT"
      />
    </>
  );
};

export default ProductClient;
