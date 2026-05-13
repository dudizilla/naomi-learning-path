export const getItemFromLocalStorage = (key, initialValue) => {
  try {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      return initialValue;
    }
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};
