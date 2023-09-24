import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const {
      storeId,
      data: { name, value },
    } = body;

    if (!storeId) {
      return NextResponse.json("storeId is Required", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("name is required", { status: 401 });
    }

    if (!value) {
      return NextResponse.json("value is required", { status: 401 });
    }

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unautorized", { status: 403 });
    }

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("API_SIZES_POST", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const body = await req.json();

    const { storeId } = body;

    if (!storeId) {
      return NextResponse.json("storeId is Required", { status: 401 });
    }

    const sizes = await prismadb.size.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("API_SIZES_GET", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}
