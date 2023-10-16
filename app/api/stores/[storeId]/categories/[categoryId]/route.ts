import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unautheticated", { status: 401 });
    }

    const body = await req.json();

    const { name, billboardId } = body;

    if (!name) {
      return NextResponse.json("Name is Required", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("Billboard Id is Required", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("category Id is Required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("s=Store Id Id is Required", {
        status: 400,
      });
    }

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unautherized", { status: 403 });
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("API_CATEGORY_PATCH", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    if (!params.categoryId) {
      return NextResponse.json("Category Id is Required", { status: 401 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("API_GET_CATEGORY", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return;
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("API_DELETE_CATEGORY", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
