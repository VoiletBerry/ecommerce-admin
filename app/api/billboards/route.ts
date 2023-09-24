import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const {
      storeId,
      data: { label, imageUrl },
    } = body;

    if (!storeId) {
      return NextResponse.json("StoreId is Required", { status: 400 });
    }

    if (!label) {
      return NextResponse.json("label is Required", { status: 400 });
    }

    if (!imageUrl) {
      return NextResponse.json("imageUrl is Required", { status: 400 });
    }

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unautherized", { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("API_BILLBOARDS", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const body = await req.json();

    const { storeId } = body;

    if (!storeId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("API_BILLBOARDS", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
