import { describe, expect, it } from 'vitest';
import { permissionScope, personCreateSchema } from '../src/index.js';

describe('permissões e cadastro', () => {
  it('nega escrita no acesso temporário', () => expect(permissionScope('ACESSO_TEMPORARIO', 'person', 'update')).toBe('none'));
  it('nega financeiro ao professor', () => expect(permissionScope('PROFESSOR', 'invoice', 'read')).toBe('none'));
  it('exige escopo de vínculo para responsável', () => expect(permissionScope('RESPONSAVEL', 'person', 'read')).toBe('linked'));
  it('não usa email ou telefone como unicidade obrigatória', () => {
    expect(personCreateSchema.safeParse({ name: 'Aluno Exemplo', roles: ['ALUNO'] }).success).toBe(true);
  });
  it('rejeita CPF inválido e perfis duplicados', () => {
    expect(personCreateSchema.safeParse({ name: 'Aluno Exemplo', cpf: '11111111111', roles: ['ALUNO'] }).success).toBe(false);
    expect(personCreateSchema.safeParse({ name: 'Aluno Exemplo', roles: ['ALUNO', 'ALUNO'] }).success).toBe(false);
  });
});
