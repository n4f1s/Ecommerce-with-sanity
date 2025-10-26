import { z } from "zod";

export const orderItemSchema = z.object({
  product: z.object({
    _id: z.string().min(1, "Product _id is required"),
  }),
  quantity: z.coerce.number().int().positive().max(999),
});

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phoneNumber: z.string().trim().min(11),
  address: z.string().trim().min(5).max(300),
  division: z.string().trim().min(1),
  district: z.string().trim().optional(),
  upazila: z.string().trim().optional(),
  city: z.string().trim().optional(),
  postalCode: z.string().trim().max(20).optional(),
  deliveryInstruction: z.string().trim().max(500).optional(),
  items: z.array(orderItemSchema).min(1),
  totalPrice: z.coerce.number().positive().max(10_000_000),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
