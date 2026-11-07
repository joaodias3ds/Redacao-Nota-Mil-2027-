export const enrollmentStatusLabel: Record<string, string> = {
  active: 'Ativa',
  approved: 'Aprovada',
  draft: 'Rascunho',
  submitted: 'Enviada à secretaria',
  waitlist: 'Lista de espera',
  cancelled: 'Cancelada',
};

export function enrollmentStatus(status: string): string {
  return enrollmentStatusLabel[status] ?? status;
}

export const studentLevelLabel: Record<string, string> = {
  INFANTIL: 'Infantil',
  FUNDAMENTAL_I: 'Fundamental I',
  FUNDAMENTAL_II: 'Fundamental II',
  ENSINO_MEDIO: 'Ensino Médio',
  CONCLUIDO: 'Concluído',
};

export function subjectStudentId(personId: string, activeRole: string, viewAsStudentId?: string): string {
  return activeRole === 'ACESSO_TEMPORARIO' && viewAsStudentId ? viewAsStudentId : personId;
}

export function studentLevel(level: string | null): string {
  if (!level) return 'Não informado';
  return studentLevelLabel[level] ?? level;
}
