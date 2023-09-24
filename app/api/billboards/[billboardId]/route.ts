import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const {
      data: { label, imageUrl },
      storeId,
      billboardId,
    } = body;

    if (!label) {
      return NextResponse.json("Label is Required", { status: 400 });
    }

    if (!label) {
      return NextResponse.json("Label is Required", { status: 400 });
    }

    if (!storeId) {
      return NextResponse.json("storeId is Required", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("billboardId is Required", { status: 400 });
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
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

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    const body = await req.json();

    const { storeId, billboardId } = body;

    if (!storeId) {
      return NextResponse.json("imageUrl Required", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("imageUrl Required", { status: 400 });
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("API_BILLBOARDID_DELETE", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const body = await req.json();

    const { storeId, billboardId } = body;

    if (!storeId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("Unauthenticated", { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("API_BILLBOARDS", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
