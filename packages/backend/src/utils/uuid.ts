import { randomUUID } from 'crypto';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function generateUuid(): string {
  return randomUUID();
}

export function isValidUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}
