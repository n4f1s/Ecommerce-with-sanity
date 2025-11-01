import { z } from "zod";

const productRefSchema = z.object({
  _id: z.string().min(1, "Product _id is required"),
});

export const orderItemSchema = z
  .object({
    // allow either nested product or a flat productId
    product: productRefSchema.optional(),
    productId: z.string().min(1, "productId is required when product is omitted").optional(),
    quantity: z.coerce.number().int().positive().max(999),
    selectedOptions: z
      .union([
        z.record(z.string(), z.string()), // Record<string,string>
        z.array(z.object({ name: z.string(), value: z.string() })), // KV array
      ])
      .optional(),
  })
  .refine(
    (i) => Boolean(i.product?._id || i.productId),
    { message: "Either product._id or productId is required", path: ["product"] }
  );

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phoneNumber: z.string().trim().min(11).max(14),
  address: z.string().trim().min(5).max(300),
  division: z.string().trim().min(1),
  district: z.string().trim().optional(),
  upazila: z.string().trim().optional(),
  city: z.string().trim().optional(),
  postalCode: z.string().trim().max(20).optional(),
  deliveryInstruction: z.string().trim().max(500).optional(),
  items: z.array(orderItemSchema).min(1),
  totalPrice: z.coerce.number().positive().max(10_000_000),
  deliveryCharge: z.number().nonnegative(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
