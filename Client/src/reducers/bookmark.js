const initialState = {
  bookmarks: []
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_BOOKMARKS_SUCCESSFUL":
      return {
        bookmarks: action.data
      };
    case "LOAD_BOOKMARKS_SUCCESSFUL":
      return {
        bookmarks: action.data
      }
    default:
      return state;
  }
};

export default bookmarkReducer;
