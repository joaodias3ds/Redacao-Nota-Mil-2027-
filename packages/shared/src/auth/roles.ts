export const roles = ['ADMIN', 'PROFESSOR', 'ALUNO', 'RESPONSAVEL', 'ACESSO_TEMPORARIO'] as const;
export type Role = typeof roles[number];
