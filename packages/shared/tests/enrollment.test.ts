import { describe, expect, it } from 'vitest';
import { parseEnrollmentStep } from '../src/index.js';

describe('etapas de matrícula aprovadas', () => {
  it('valida o contato inicial', () => {
    expect(() => parseEnrollmentStep(1, { contactEmail: 'invalido' })).toThrow();
  });
  it('exige confirmação na revisão', () => {
    expect(() => parseEnrollmentStep(8, { confirmed: false })).toThrow();
    expect(parseEnrollmentStep(8, { confirmed: true })).toEqual({ confirmed: true });
  });
  it('não permite edição do resultado do passo 9 pelo cliente', () => {
    expect(() => parseEnrollmentStep(9, {})).toThrow();
  });
});
