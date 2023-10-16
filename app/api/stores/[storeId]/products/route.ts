import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    const body = await req.json();

    const {
      name,
      price,
      images,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!params.storeId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    if (!name) {
      return NextResponse.json("Name is Required", { status: 400 });
    }

    if (!price) {
      return NextResponse.json("Price is Required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json("categoryId is Required", { status: 400 });
    }

    if (!colorId) {
      return NextResponse.json("colorId is Required", { status: 400 });
    }

    if (!sizeId) {
      return NextResponse.json("colorId is Required", { status: 400 });
    }

    const storeConfirmation = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("API_POST_PRODUCT", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeyId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    const product = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("API_GET_PRODUCT", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
