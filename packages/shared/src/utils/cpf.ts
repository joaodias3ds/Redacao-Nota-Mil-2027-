export function cleanCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

export function formatCpf(cpf: string): string {
  const digits = cleanCpf(cpf);
  if (digits.length !== 11) return cpf;
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function isValidCpf(cpf: string): boolean {
  const cleaned = cleanCpf(cpf);
  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;
  const digit = (length: number) => {
    const sum = [...cleaned.slice(0, length)].reduce(
      (total, number, index) => total + Number(number) * (length + 1 - index),
      0
    );
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  return digit(9) === Number(cleaned[9]) && digit(10) === Number(cleaned[10]);
}

