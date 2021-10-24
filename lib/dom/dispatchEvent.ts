/**
 * Dispatches custom event with dataTransfer object provided.
 */
export default function dispatchEvent(target: HTMLElement, event: string, dataTransfer: DataTransfer): void {
  const eventPayload = {
    bubbles: true,
    cancelable: true,
    detail: dataTransfer,
  };

  try {
    const e = new CustomEvent(event, eventPayload);
    Object.assign(e, { dataTransfer });

    target.dispatchEvent(e);
  } catch (e) {
    // make sure event triggering won't break if subject element is not visible or in DOM anymore
  }
}
