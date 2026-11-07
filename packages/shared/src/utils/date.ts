export function isMinorBirthDate(birthDate: Date | string | null | undefined): boolean | null {
  if (!birthDate) return null;
  const d = typeof birthDate === 'string' ? new Date(`${birthDate.slice(0, 10)}T12:00:00Z`) : birthDate;
  if (isNaN(d.getTime())) return null;

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);

  const birthYear = d.getUTCFullYear();
  const birthMonth = d.getUTCMonth() + 1;
  const birthDay = d.getUTCDate();

  const age = year - birthYear - (month < birthMonth || (month === birthMonth && day < birthDay) ? 1 : 0);
  return age < 18;
}

export function formatDateBr(date: Date | string | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(d);
}

