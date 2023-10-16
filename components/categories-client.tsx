"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import ApiList from "./api-list";

import { CategoryColumn, columnsCategories } from "./colums-category";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columnsCategories} data={data} searchItem="name" />

      <Heading title="Api's" description="API calls for billboards" />
      <Separator />
      <ApiList
        storeId={`${params.storeId}`}
        dataId="categoryId"
        dataName="categories"
        title="CATEGORIES"
        titleById="CATEGORY"
      />
    </>
  );
};

export default CategoryClient;
