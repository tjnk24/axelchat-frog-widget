export const checkIfScrolledToBottom = (ref: HTMLDivElement) => (ref?.scrollHeight - ref?.offsetHeight - ref?.scrollTop) < 1;
