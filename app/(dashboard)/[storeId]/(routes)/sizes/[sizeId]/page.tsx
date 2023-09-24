import SizeForm from "@/components/size-form";

import prismadb from "@/lib/prismadb";

const CategoryIdPage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default CategoryIdPage;
