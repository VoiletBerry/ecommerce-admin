import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
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
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("API_PATCH_SIZEID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const { storeId } = body;

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("API_Delete_SIZEID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const body = await req.json();

    const { storeId } = body;

    const size = await prismadb.size.findMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("API_GET_SIZEID", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
