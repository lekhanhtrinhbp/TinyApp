export const updateBookmarks = (id, title) => async dispatch => {
  const currentSavedBookmarks = localStorage.getItem("bookmarks");
  let newBookmarks = [];
  if (currentSavedBookmarks) {
    newBookmarks = JSON.parse(currentSavedBookmarks);
  }
  let check = false;
  newBookmarks.forEach(bookmark => {
    if (bookmark.id === id) {
      check = true;
    }
  });
  if (!check) {
    newBookmarks.push({ id, title, isBookmarked: true });
  } else {
    newBookmarks = newBookmarks.filter(element => element.id !== id);
  }
  localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  dispatch({
    type: "UPDATE_BOOKMARKS_SUCCESSFUL",
    data: newBookmarks
  });
};

export const loadBookmarks = () => async dispatch => {
  const currentSavedBookmarks = localStorage.getItem("bookmarks");
  let currentBookmarkList = [];
  if (currentSavedBookmarks) {
    currentBookmarkList = JSON.parse(currentSavedBookmarks);
  }
  dispatch({
    type: "LOAD_BOOKMARKS_SUCCESSFUL",
    data: currentBookmarkList
  });
};
