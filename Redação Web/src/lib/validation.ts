export function loginError(email: string, password: string): string | null {
  const trimmed = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Informe um e-mail válido.';
  if (password.length < 8) return 'A senha precisa ter pelo menos 8 caracteres.';
  return null;
}

export function personNameError(name: string): string | null {
  const value = name.trim();
  if (value.length < 2) return 'Informe o nome completo.';
  if (value.length > 160) return 'O nome pode ter no máximo 160 caracteres.';
  return null;
}

export function optionalEmailError(email: string): string | null {
  const value = email.trim();
  if (!value) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Informe um e-mail válido.';
  return null;
}

export function phoneError(phone: string): string | null {
  const value = phone.trim();
  if (!value) return null;
  if (!/^[\d\s()+-]{8,30}$/.test(value)) return 'Informe um telefone com DDD.';
  return null;
}

export function classGroupError(name: string, teacherId: string, capacity: string): string | null {
  const title = name.trim();
  if (title.length < 2 || title.length > 120) return 'O nome da turma precisa ter de 2 a 120 caracteres.';
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(teacherId)) return 'Selecione um professor cadastrado.';
  const seats = Number(capacity);
  if (!Number.isInteger(seats) || seats < 1) return 'Informe a capacidade com um número inteiro maior que zero.';
  return null;
}

export function trialRequestErrors(input: { name: string; phone: string; email: string; course: string; consent: boolean }): Record<string, string> {
  const errors: Record<string, string> = {};
  if (input.name.trim().length < 3) errors.name = 'Informe o nome completo.';
  if (input.phone.replace(/\D/g, '').length < 10) errors.phone = 'Informe um telefone com DDD, como (62) 90000-0000.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = 'Informe um e-mail válido, como nome@email.com.';
  if (!input.course) errors.course = 'Escolha um curso.';
  if (!input.consent) errors.consent = 'Autorize o contato para a equipe responder.';
  return errors;
}

export function relationshipError(value: string): string | null {
  const text = value.trim();
  if (text.length < 2 || text.length > 80) return 'Informe o parentesco, por exemplo mãe ou pai.';
  return null;
}
