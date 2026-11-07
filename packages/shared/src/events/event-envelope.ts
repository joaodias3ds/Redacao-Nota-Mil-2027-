import { z } from 'zod';

export const domainEventEnvelopeSchema = z.object({
  eventId: z.string().uuid(),
  entityType: z.string().min(1).max(60),
  entityId: z.string().uuid(),
  version: z.number().int().positive(),
  action: z.string().min(1).max(60),
  occurredAt: z.string(),
  actorId: z.string().uuid().optional(),
}).strict();

export type DomainEventEnvelope = z.infer<typeof domainEventEnvelopeSchema>;

