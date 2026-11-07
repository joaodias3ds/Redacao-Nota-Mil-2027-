import { describe, expect, it } from 'vitest';
import {
  formatCentsToBrl,
  parseBrlToCents,
  isValidCpf,
  formatCpf,
  isMinorBirthDate,
  primitiveColors,
  semanticLightColors,
  ApiClient,
} from '../src/index.js';

describe('utilitários e tokens compartilhados', () => {
  it('formata e converte valores monetários em centavos', () => {
    expect(formatCentsToBrl(15000)).toContain('150,00');
    expect(parseBrlToCents('R$ 150,00')).toBe(15000);
  });

  it('valida e formata CPF corretamente', () => {
    expect(isValidCpf('11111111111')).toBe(false);
    expect(formatCpf('12345678901')).toBe('123.456.789-01');
  });

  it('calcula maioridade/menoridade civil', () => {
    expect(isMinorBirthDate('2000-01-01')).toBe(false);
    expect(isMinorBirthDate('2020-01-01')).toBe(true);
    expect(isMinorBirthDate(null)).toBeNull();
  });

  it('possui as cores oficiais aprovadas do design system', () => {
    expect(primitiveColors.pink500).toBe('#EC008B');
    expect(primitiveColors.pink600).toBe('#D1007B');
    expect(primitiveColors.graphite).toBe('#211F20');
    expect(semanticLightColors.actionPrimary).toBe('#D1007B');
  });

  it('instancia o ApiClient sem erros', () => {
    const client = new ApiClient({ baseUrl: 'http://localhost:3333' });
    expect(client).toBeDefined();
  });
});

