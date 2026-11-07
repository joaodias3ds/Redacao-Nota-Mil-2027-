import { z } from 'zod';

export const invoiceStatusEnum = z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED']);

export const paymentMethodEnum = z.enum(['PIX', 'CREDIT_CARD', 'BOLETO', 'CASH']);

export const invoiceSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  dueDate: z.string(),
  status: invoiceStatusEnum,
  paymentMethod: paymentMethodEnum.optional(),
  paidAt: z.string().optional(),
});

export const invoicePaymentSchema = z.object({
  invoiceId: z.string().uuid(),
  paymentMethod: paymentMethodEnum,
  amountCents: z.number().int().positive(),
  notes: z.string().trim().max(500).optional(),
}).strict();

export type InvoiceStatus = z.infer<typeof invoiceStatusEnum>;
export type PaymentMethod = z.infer<typeof paymentMethodEnum>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoicePayment = z.infer<typeof invoicePaymentSchema>;

