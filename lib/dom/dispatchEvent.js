/**
 * @description dispatches custom event with dataTransfer object provided
 *
 * @param {HTMLElement} target
 * @param {string} event
 * @param {DataTransfer} dataTransfer
 */
export default function dispatchEvent(target, event, dataTransfer) {
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
