export default function merge<T>(target: Partial<T> = {}, source: Partial<T> = {}): T {
  return {
    ...source,
    ...target,
  } as T;
}
