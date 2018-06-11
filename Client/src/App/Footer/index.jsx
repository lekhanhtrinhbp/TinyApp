import React from "react";

import styles from "./styles.css";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h4>Use Sschool</h4>
          <a className={styles.options}>How It Works</a>
          <a className={styles.options}>For Large & Complex Events</a>
          <a className={styles.options}>Pricing</a>
          <a className={styles.options}>Content Standards</a>
          <a className={styles.options}>Sschool Mobile App</a>
          <a className={styles.options}>Sschool Check-In App</a>
          <a className={styles.options}>Sschool Spectrum</a>
          <a className={styles.options}>Rally - Fun Things To Do</a>
          <a className={styles.options}>Sschool Reviews</a>
          <a className={styles.options}>Sitemap</a>
        </div>
        <div className={styles.item}>
          <h4>Plan Events</h4>
          <a className={styles.options}>Conference Management Software</a>
          <a className={styles.options}>Food and Drink Ticketing</a>
          <a className={styles.options}>Nonprofits & Fundraisers</a>
          <a className={styles.options}>Sell Tickets</a>
          <a className={styles.options}>Event Management & Planning</a>
          <a className={styles.options}>Online Event Registration</a>
          <a className={styles.options}>Online RSVP</a>
          <a className={styles.options}>Venue Booking & Management</a>
          <a className={styles.options}>Event Equipment & Staffing</a>
          <a className={styles.options}>Event Promotion</a>
        </div>
        <div className={styles.item}>
          <h4>Find Events</h4>
          <a className={styles.options}>Boston Events</a>
          <a className={styles.options}>Chicago Events</a>
          <a className={styles.options}>Denver Events</a>
          <a className={styles.options}>Houston Events</a>
          <a className={styles.options}>Los Angeles Events</a>
          <a className={styles.options}>Nashville Events</a>
          <a className={styles.options}>New York Events</a>
          <a className={styles.options}>San Diego Events</a>
          <a className={styles.options}>San Francisco Events</a>
          <a className={styles.options}>All Cities</a>
        </div>
        <div className={styles.item}>
          <h4>Connect With Us</h4>
          <a className={styles.options}>
            <i className="fa fa-envelope" />Contact Support
          </a>
          <a className={styles.options}>
            <i className="fa fa-envelope" />Contact Sales
          </a>
          <a className={styles.options}>
            <i className="fa fa-twitter" />Twitter
          </a>
          <a className={styles.options}>
            <i className="fa fa-facebook-square" />Facebook
          </a>
          <a className={styles.options}>
            <i className="fa fa-linkedin-square" />LinkedIn
          </a>
          <a className={styles.options}>
            <i className="fa fa-instagram" />Instagram
          </a>
          <a className={styles.options}>
            <i className="fa fa-google-plus" />Google+
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
