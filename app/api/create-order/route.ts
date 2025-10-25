import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backend-client";
import crypto from "crypto";
import { Order } from "@/sanity.types";

// POST /api/create-order
export async function POST(req: Request) {
  try {
    const body: Order & {
      division?: string;
      city?: string;
      postalCode?: string;
      deliveryInstruction?: string;
      items: {
        product: { _id: string };
        quantity: number;
      }[];
    } = await req.json();

    const {
      customerName,
      phoneNumber,
      address,
      division,
      district,
      upazila,
      city,
      postalCode,
      deliveryInstruction,
      items,
      totalPrice,
    } = body;

    // 🔍 Validation
    if (
      !customerName ||
      !phoneNumber ||
      !address ||
      !division ||
      !items?.length
    ) {
      return NextResponse.json(
        { error: "Missing required shipping or order fields." },
        { status: 400 }
      );
    }

    // 🧾 Generate readable order number
    const orderNumber = crypto.randomUUID();
    
    // 🧱 Prepare the Sanity order document
    const orderDoc = {
      _type: "order",
      orderNumber,
      customerName,
      phoneNumber,
      address,
      division,
      district,
      upazila,
      city,
      postalCode,
      deliveryInstruction: deliveryInstruction || "",
      totalPrice,
      // currency: "BDT",
      paymentMethod: "Cash on Delivery",
      status: "pending",
      orderDate: new Date().toISOString(),
      products: items.map((item) => ({
        _type: "object",
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
    };

    // 🧠 Store in Sanity
    const result = await backendClient.create(orderDoc);

    // ✅ Response
    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: result._id,
      orderNumber,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
