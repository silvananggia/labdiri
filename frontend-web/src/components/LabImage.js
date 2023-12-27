import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
  Col,
  Row,
} from 'reactstrap';

const items = [
  {
    id: 1,
    src: 'image1.jpg',
    altText: 'Image 1',
    caption: 'Image 1 Caption',
  },
  {
    id: 2,
    src: 'image2.jpg',
    altText: 'Image 2',
    caption: 'Image 2 Caption',
  },
  {
    id: 3,
    src: 'image3.jpg',
    altText: 'Image 3',
    caption: 'Image 3 Caption',
  },
];

const CarouselWithThumbnailsLeft = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.id}
    >
      <img src={item.src} alt={item.altText} />
      <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
    </CarouselItem>
  ));

  return (
    <Row>
      <Col md="3">
        <div className="thumbnail-container">
          {items.map((item, index) => (
            <img
              key={item.id}
              src={item.src}
              alt={item.altText}
              className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Col>
      <Col md="9">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </Col>
    </Row>
  );
};

export default CarouselWithThumbnailsLeft;
