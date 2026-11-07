export interface OfflineOperation<T = unknown> {
  operationId: string;
  type: string;
  payload: T;
  baseVersion: number;
  createdAt: string;
  status: 'pending' | 'syncing' | 'synced' | 'conflict' | 'failed';
}

class OfflineQueue {
  private queue: OfflineOperation[] = [];

  enqueue<T>(type: string, payload: T, baseVersion = 1): OfflineOperation<T> {
    const op: OfflineOperation<T> = {
      operationId: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      payload,
      baseVersion,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    this.queue.push(op as OfflineOperation);
    return op;
  }

  getPending(): OfflineOperation[] {
    return this.queue.filter((op) => op.status === 'pending');
  }

  markSynced(operationId: string) {
    this.queue = this.queue.filter((op) => op.operationId !== operationId);
  }

  markConflict(operationId: string) {
    const op = this.queue.find((o) => o.operationId === operationId);
    if (op) op.status = 'conflict';
  }

  clear() {
    this.queue = [];
  }
}

export const offlineQueue = new OfflineQueue();

