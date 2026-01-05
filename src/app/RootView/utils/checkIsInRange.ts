export const checkIsInRange = (viewportHeight: number) => {
    const bodyHeight = document.body.scrollHeight;

    return viewportHeight >= bodyHeight - 40 && viewportHeight <= bodyHeight;
};
