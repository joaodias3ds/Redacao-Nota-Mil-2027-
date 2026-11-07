import type { Role } from './roles.js';

export type Resource = 'person' | 'guardianLink' | 'classGroup' | 'attendance' | 'essay' | 'invoice' | 'material' | 'notice' | 'audit';
export type Action = 'read' | 'create' | 'update' | 'delete';
export type Scope = 'all' | 'assigned' | 'self' | 'linked' | 'none';

const matrix: Record<Role, Partial<Record<Resource, Partial<Record<Action, Scope>>>>> = {
  ADMIN: { person: { read: 'all', create: 'all', update: 'all', delete: 'all' }, guardianLink: { read: 'all', create: 'all', update: 'all', delete: 'all' }, classGroup: { read: 'all', create: 'all', update: 'all' }, attendance: { read: 'all', create: 'all', update: 'all' }, essay: { read: 'all', create: 'all', update: 'all' }, invoice: { read: 'all', create: 'all', update: 'all' }, material: { read: 'all', create: 'all', update: 'all' }, notice: { read: 'all', create: 'all', update: 'all' }, audit: { read: 'all' } },
  PROFESSOR: { person: { read: 'assigned' }, classGroup: { read: 'assigned' }, attendance: { read: 'assigned', create: 'assigned', update: 'assigned' }, essay: { read: 'assigned', create: 'assigned', update: 'assigned' }, material: { read: 'assigned', create: 'assigned' }, notice: { read: 'assigned' } },
  ALUNO: { person: { read: 'self', update: 'self' }, classGroup: { read: 'self' }, attendance: { read: 'self' }, essay: { read: 'self', create: 'self' }, material: { read: 'self' }, notice: { read: 'self' } },
  RESPONSAVEL: { person: { read: 'linked' }, classGroup: { read: 'linked' }, attendance: { read: 'linked' }, essay: { read: 'linked' }, invoice: { read: 'linked' }, material: { read: 'linked' }, notice: { read: 'linked' } },
  ACESSO_TEMPORARIO: { person: { read: 'self' }, classGroup: { read: 'self' }, attendance: { read: 'self' }, essay: { read: 'self' }, material: { read: 'self' }, notice: { read: 'self' } },
};

export function permissionScope(role: Role, resource: Resource, action: Action): Scope {
  return matrix[role][resource]?.[action] ?? 'none';
}
