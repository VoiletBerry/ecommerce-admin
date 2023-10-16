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
      return NextResponse.json("Unathenticated", { status: 401 });
    }

    const body = await req.json();

    const { name, billboardId } = body;

    if (!name) {
      return NextResponse.json("Name is Required", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("Billboard Id is Required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id Id is Required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[API_CATEGORIES_POST]", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}
 
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[API_CATEGORIES_POST]", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}
