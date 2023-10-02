import BillboardClient from "@/components/billboard-client";
import { ProductColumn } from "@/components/colums-product";
import ProductClient from "@/components/product-client";
import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { format } from "date-fns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    color: item.color.value,
    size: item.size.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatedProduct} />
      </div>
    </div>
  );
};

export default ProductsPage;
