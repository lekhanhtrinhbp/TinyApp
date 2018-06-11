export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("BOOKMARKS");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("BOOKMARKS", serializedState);
  } catch (err) {
    // Ignore
  }
};

export const loadBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks === null) {
      return undefined;
    }
    return JSON.parse(bookmarks);
  } catch (err) {
    return undefined;
  }
};
