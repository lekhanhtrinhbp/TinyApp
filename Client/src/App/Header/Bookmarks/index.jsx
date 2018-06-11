import React from "react";
import { connect } from "react-redux";
import { Dropdown, Icon } from "semantic-ui-react";
import TranslateTag from "./../../../components/TranslateTag";
import { loadBookmarks } from "../../../utils/localStorage";

const Bookmarks = props => {
  const bookmarks = props.bookmarks ? props.bookmarks : loadBookmarks();
  return (
    <div>
      {bookmarks && bookmarks.length > 0 ? (
        <Dropdown
          trigger={
            <span>
              {props.isMobile ? (
                <Icon name="bookmark" />
              ) : (
                <TranslateTag lblKey="your-saved-events" />
              )}
              <a
                className="ui red circular label"
                style={{ marginLeft: "5px" }}
              >
                {bookmarks.length}
              </a>
            </span>
          }
        >
          <Dropdown.Menu>
            {bookmarks.map((bookmark, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => props.handleItemClick(bookmark.id)}
                >
                  {bookmark.title}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = ({ bookmark }) => ({
  bookmarks: bookmark.bookmarks
});

// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, null)(Bookmarks);
