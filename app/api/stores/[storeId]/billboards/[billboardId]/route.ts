import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!label) {
      return NextResponse.json("Label is Required", { status: 400 });
    }

    if (!label) {
      return NextResponse.json("Label is Required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("storeId is Required", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("billboardId is Required", { status: 400 });
    }

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("API_BILLBOARDID_PATCH", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("imageUrl Required", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("imageUrl Required", { status: 400 });
    }

    const storeConfirmation = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeConfirmation) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("API_BILLBOARDID_DELETE", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    const billboards = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("API_BILLBOARDS", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
