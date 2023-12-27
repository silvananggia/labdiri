import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    altText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat finibus mauris, interdum euismod lacus cursus in. Quisque elit est, consequat fermentum orci vitae, mollis convallis lorem. Morbi tincidunt ac felis et bibendum. Praesent nec accumsan metus. Vestibulum rutrum tincidunt erat. Curabitur magna sem, ultricies non ultricies ac, dignissim in risus.',
    caption: 'Direktorat Pengelolaan Lab, Fasilitas Riset dan Kawasan Sains Teknologi',
    key: 1,
    src: "https://minio.brin.go.id/website//uploads/images/slider/2023/06/1686802440-30469990.webp"
  },
  {
    altText: 'Slide 2',
    caption: 'Direktorat Pengelolaan Lab, Fasilitas Riset dan Kawasan Sains Teknologi',
    key: 2,
    src: 'https://minio.brin.go.id/website//uploads/images/slider/2023/06/1686884413-23615416.webp'
  },
  {
    altText: 'Slide 3',
    caption: 'Direktorat Pengelolaan Lab, Fasilitas Riset dan Kawasan Sains Teknologi',
    key: 3,
    src: 'https://minio.brin.go.id/website//uploads/images/slider/2023/03/1679389081-57282369.webp'
  }
];

class CarouselHome extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem 
          className="custom-tag drk"
          tag="div"
          key={item.key}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <img src={item.src} alt={item.altText} width="100%"/>
          <CarouselCaption captionText={item.altText} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background: black;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default CarouselHome;