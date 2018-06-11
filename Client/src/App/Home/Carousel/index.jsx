import React, { Component } from 'react';
import {
  Carousel,
  CarouselInner,
  CarouselItem,
  CarouselControl,
} from 'mdbreact';
import styles from './styles.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      activeItem: 1,
      maxLength: 4,
    };
  }

  next() {
    const nextItem = this.state.activeItem + 1;
    if (nextItem > this.state.maxLength) {
      this.setState({ activeItem: 1 });
    } else {
      this.setState({ activeItem: nextItem });
    }
  }

  prev() {
    const prevItem = this.state.activeItem - 1;
    if (prevItem < 1) {
      this.setState({ activeItem: this.state.maxLength });
    } else {
      this.setState({ activeItem: prevItem });
    }
  }

  goToIndex(item) {
    if (this.state.activeItem !== item) {
      this.setState({
        activeItem: item,
      });
    }
  }

  render() {
    return (
      <Carousel
        activeItem={this.state.activeItem}
        next={this.next}
        className={styles.carousel}
      >
        <CarouselInner>
          <CarouselItem itemId="1">
            <img
              src="https://cdn.evbstatic.com/s3-build/perm_001/35d88f/django/images/home/banners/homepage_hero_banner_1.jpg"
              alt="First slide"
              className={styles.item}
            />
          </CarouselItem>
          <CarouselItem itemId="2">
            <video className={styles.item} autoPlay loop>
              <source
                src="https://mdbootstrap.com/img/video/forest.mp4"
                type="video/mp4"
              />
              <track kind="captions" />
            </video>
          </CarouselItem>
          <CarouselItem itemId="3">
            <video className={styles.item} autoPlay loop>
              <source
                src="https://mdbootstrap.com/img/video/Agua-natural.mp4"
                type="video/mp4"
              />
              <track kind="captions" />
            </video>
          </CarouselItem>
          <CarouselItem itemId="4">
            <img
              src="https://cdn.evbstatic.com/s3-build/perm_001/99ca9f/django/images/home/banners/homepage_hero_banner_4.jpg"
              alt="Mattonit's item"
              className={styles.item}
            />
          </CarouselItem>
        </CarouselInner>
        <CarouselControl
          direction="prev"
          role="button"
          onClick={() => {
            this.prev();
          }}
        />
        <CarouselControl
          direction="next"
          role="button"
          onClick={() => {
            this.next();
          }}
        />
      </Carousel>
    );
  }
}

export default Container;
