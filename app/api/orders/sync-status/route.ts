import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backend-client";

export async function POST(request: NextRequest) {
  try {
    // Get order IDs from request body
    const { orderIds } = await request.json();

    // Validate input
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid order IDs" },
        { status: 400 }
      );
    }

    // ✅ Only fetch status for specific orders (user's orders)
    const orders = await backendClient.fetch(
      `*[_type == "order" && orderNumber in $orderIds] {
        orderNumber,
        status
      }`,
      { orderIds }
    );

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error syncing order statuses:", error);
    return NextResponse.json(
      { error: "Failed to sync order statuses" },
      { status: 500 }
    );
  }
}
