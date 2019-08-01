export default function ensureDefaults(target, defaults) {
  return {
    ...defaults,
    ...target,
  };
}
