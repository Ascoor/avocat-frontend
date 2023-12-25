import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SpiderWeb from './SpiderWeb';
import anime from 'animejs'; // Import the anime library
import { Carousel } from 'react-bootstrap';

import { Slider1, Slider2, Slider3, Slider4 } from '../../assets/img/index';

const HomeCarousel = () => {

  useEffect(() => {
    anime.timeline({ loop: true })
      .add({
        targets: '.animated-p .letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 800,
        delay: (el, i) => 70 * (i + 1)
      }).add({
        targets: '.animated-p .letter',
        scale: [1, 0.3],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 800,
        delay: (el, i) => 70 * (i + 1)
      });
  }, []);

  const wrapLetters = (text) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter">{letter}</span>
    ));
  };

  const carouselItems = [
    {
      imgSrc: Slider1,
      caption: "تنظيم أعمالك القانونية ببراعة",
      altText: "نظام أفوكات لإدارة مكاتب المحاماة"
    },
    {
      imgSrc: Slider2,
      caption: "إدارة الملفات والوثائق بسهولة وفعالية",
      altText: "إدارة الملفات والوثائق"
    },
    {
      imgSrc: Slider3,
      caption: "تتبع القضايا والمهام بدقة واحترافية",
      altText: "تتبع القضايا والمهام"
    },
    {
      imgSrc: Slider4,
      caption: "حلول متكاملة لمكاتب المحاماة الناجحة",
      altText: "حلول متكاملة لمكاتب المحاماة"
    }
  ];


  return (
    <section className="home-page">
      <Carousel>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img src={item.imgSrc} className="d-block img-fluid" alt={item.altText} />
            <Carousel.Caption>
              <p className="animated-p" style={{ fontSize: '24px', color: '#007bff' }}>
                {wrapLetters(item.caption)}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="spider-web-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
        <Canvas style={{ background: 'transparent' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpiderWeb color="white" lineWidth={1} divisions={20} />
        </Canvas>
      </div>
    </section>
  );
}

export default HomeCarousel;