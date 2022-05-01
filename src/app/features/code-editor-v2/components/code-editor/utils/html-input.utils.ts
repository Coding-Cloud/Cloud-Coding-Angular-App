export const makeInputFocusedAfterOneFocused = (elementId: string): void => {
  setTimeout(() => {
    const inputAppear = document.getElementById(elementId);
    inputAppear?.focus();
  }, 500);
};
