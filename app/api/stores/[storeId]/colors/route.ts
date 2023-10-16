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
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const { name, value } = body;

    if (!params.storeId) {
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
        id: params.storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unautorized", { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("API_Colors_POST", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("storeId is Required", { status: 401 });
    }

    const color = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("API_colors_GET", error);
    NextResponse.json("Internal Server Error", { status: 500 });
  }
}
