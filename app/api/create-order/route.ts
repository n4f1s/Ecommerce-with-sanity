import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";

interface OrderItem {
  product: {
    _id: string;
  };
  quantity: number;
}

interface OrderRequestBody {
  customerName: string;
  phoneNumber: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
}

export async function POST(req: Request) {
  try {
    const body: OrderRequestBody = await req.json();
    const { customerName, phoneNumber, address, items, totalPrice } = body;

    // Validation
    if (!customerName || !phoneNumber || !address || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Prepare Sanity order document
    const orderDoc = {
      _type: "order",
      orderNumber,
      customerName,
      phoneNumber,
      address,
      totalPrice,
      paymentMethod: "Cash on Delivery",
      status: "pending",
      orderDate: new Date().toISOString(),
      products: items.map((item): Record<string, unknown> => ({
        _type: "object",
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
    };

    // Write to Sanity
    const result = await backendClient.create(orderDoc);

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
