import T from "prop-types";
import React from "react";
import { Image, Grid, Button, Input, Form } from "semantic-ui-react";
import translate from "components/Translate";
import TranslateTag from "./../../components/TranslateTag";

import Search from "./Search";
import RecentlyEvents from "./RecentlyEvents";
import PopularEvents from "./PopularEvents";
import Subscription from "./Subscription";
import Categories from "./Categories";
import styles from "./styles.css";

const topicIcon1 = require("../../images/Search.png");
const topicIcon2 = require("../../images/Book.png");
const topicIcon3 = require("../../images/Learn.png");

const Home = props => (
  <div>
    <Search />

    <div className={styles.topicSection}>
      <div className={styles.topicContainer}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <div className={styles.topicColumn}>
                <div className={styles.topicIcon}>
                  <Image src={topicIcon1} style={{ display: "inline-flex" }} />
                </div>
                <div style={{ flex: 3 }}>
                  <div>
                    <TranslateTag lblKey="search-icon" fontWeight="800" />
                  </div>
                  <div>
                    <TranslateTag lblKey="search-des" />
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className={styles.topicColumn}>
                <div className={styles.topicIcon}>
                  <Image src={topicIcon2} style={{ display: "inline-flex" }} />
                </div>
                <div style={{ flex: 3 }}>
                  <div>
                    <TranslateTag lblKey="book-icon" fontWeight="800" />
                  </div>
                  <div>
                    <TranslateTag lblKey="book-des" />
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className={styles.topicColumn}>
                <div className={styles.topicIcon}>
                  <Image src={topicIcon3} style={{ display: "inline-flex" }} />
                </div>
                <div style={{ flex: 3 }}>
                  <div>
                    <TranslateTag lblKey="learn-icon" fontWeight="800" />
                  </div>
                  <div>
                    <TranslateTag lblKey="learn-des" />
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>

    <div className={styles.mainContent}>
      <RecentlyEvents />
      <PopularEvents />
    </div>

    <Subscription />
  </div>
);

Home.propTypes = {
  home: T.shape()
};

export default Home;
