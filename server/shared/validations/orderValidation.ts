import { z } from 'https://deno.land/x/zod/mod.ts';

export const orderSchema = z.object({
    customerId: z.string().uuid(),
    productIds: z.array(z.string().uuid()),
    totalAmount: z.number().positive()
});
