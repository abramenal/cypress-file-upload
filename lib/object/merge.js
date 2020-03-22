export default function merge(target = {}, source = {}) {
  return {
    ...source,
    ...target,
  };
}
