import React, { useState , useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { Slider1, Slider2, Slider3, Slider4 } from '../images/index';
import Navbar from './Blade/Navbar';
import anime from 'animejs';

export default function HomeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const animateTitle = (titleClass) => {
      const textWrapper = document.querySelector(titleClass);
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
      anime.timeline({ loop: true })
        .add({
          targets: `${titleClass} .letter`,
          translateX: [40, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 + 30 * i,
        }).add({
          targets: `${titleClass} .letter`,
          translateX: [0, -30],
          opacity: [1, 0],
          easing: "easeInExpo",
          duration: 1100,
          delay: (el, i) => 100 + 30 * i,
        });
    };
  
    // Apply animation to both <p> and <h1> elements
    animateTitle('.animated-p');
    animateTitle('.animated-h1');
  
  }, []);
  
  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  }

  return (
    <section className="home-page">
      <Navbar />
      <Carousel id="carouselExampleCaptions">
       <Carousel.Item>
  <img src={Slider1} className="d-block img-fluid" alt="Fourth slide" />
  <Carousel.Caption className="d-none d-md-block">
    <p className="animated-p">Reliable Legal Solutions</p>
    <h1 className="ml12 animated-h1">For All Your Needs</h1>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img src={Slider2} className="d-block img-fluid" alt="Fourth slide" />
  <Carousel.Caption className="d-none d-md-block">
    <p className="animated-p">Reliable Legal Solutions</p>
    <h1 className="ml12 animated-h1">For All Your Needs</h1>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img src={Slider3} className="d-block img-fluid" alt="Fourth slide" />
  <Carousel.Caption className="d-none d-md-block">
    <p className="animated-p">Reliable Legal Solutions</p>
    <h1 className="ml12 animated-h1">For All Your Needs</h1>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img src={Slider4} className="d-block img-fluid" alt="Fourth slide" />
  <Carousel.Caption className="d-none d-md-block">
    <p className="animated-p">Reliable Legal Solutions</p>
    <h1 className="ml12 animated-h1">For All Your Needs</h1>
  </Carousel.Caption>
</Carousel.Item>

      </Carousel>
    </section>
  );
}
