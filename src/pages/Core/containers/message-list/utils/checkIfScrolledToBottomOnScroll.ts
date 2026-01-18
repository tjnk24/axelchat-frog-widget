export const checkIfScrolledToBottomOnScroll = (div: HTMLDivElement) => div.scrollHeight - div.offsetHeight - div.scrollTop < 1;
