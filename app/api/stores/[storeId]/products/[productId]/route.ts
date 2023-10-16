import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
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
    console.log("API_GET_PRODUCTID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        storeId: params.storeId,
        colorId,
        categoryId,
        sizeId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("API_PATCH_PRODUCTID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    if (!params.productId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("API_DELETE_PRODUCTID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
