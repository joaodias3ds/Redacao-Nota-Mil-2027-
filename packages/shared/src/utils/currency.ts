export function formatCentsToBrl(cents: number): string {
  const value = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function parseBrlToCents(brlString: string): number {
  const numeric = brlString.replace(/[^\d]/g, '');
  if (!numeric) return 0;
  return parseInt(numeric, 10);
}

