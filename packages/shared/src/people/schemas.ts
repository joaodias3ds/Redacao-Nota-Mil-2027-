import { z } from 'zod';

export const personRoles = z.enum(['ADMIN', 'PROFESSOR', 'ALUNO', 'RESPONSAVEL']);
export const studentLevels = z.enum(['INFANTIL', 'FUNDAMENTAL_I', 'FUNDAMENTAL_II', 'ENSINO_MEDIO', 'CONCLUIDO']);
export function validCpf(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;
  const digit = (length: number) => {
    const sum = [...cpf.slice(0, length)].reduce((total, number, index) => total + Number(number) * (length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}
export const personCreateSchema = z.object({
  name: z.string().trim().min(2).max(160),
  birthDate: z.iso.date().optional(),
  email: z.email().optional(),
  phone: z.string().trim().max(30).optional(),
  cpf: z.string().refine(validCpf, 'Informe um CPF válido com 11 números.').optional(),
  studentLevel: studentLevels.optional(),
  isDemo: z.boolean().default(false),
  roles: z.array(personRoles).min(1).refine((items) => new Set(items).size === items.length, 'Não repita perfis.'),
}).strict();
export const personPatchSchema = personCreateSchema.partial().omit({ roles: true, isDemo: true }).extend({ version: z.number().int().positive() }).strict();
export const guardianLinkCreateSchema = z.object({
  studentId: z.uuid(), guardianId: z.uuid(), relationship: z.string().trim().min(2).max(80),
  pedagogical: z.boolean(), financial: z.boolean(), adultAuthorized: z.boolean().default(false),
}).strict();
export type PersonCreate = z.infer<typeof personCreateSchema>;
export type PersonPatch = z.infer<typeof personPatchSchema>;
export type GuardianLinkCreate = z.infer<typeof guardianLinkCreateSchema>;
