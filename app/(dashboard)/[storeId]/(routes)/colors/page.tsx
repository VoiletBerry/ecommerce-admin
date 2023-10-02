import ColorClient from "@/components/color-client";
import { ColorColumn } from "@/components/colums-color";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const foramtedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={foramtedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
