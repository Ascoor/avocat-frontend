import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Slider1, Slider2, Slider3, Slider4 } from '../images/index';
import anime from 'animejs';
import ScrollReveal from 'scrollreveal';
import Swiper from 'swiper';
import Navbar from './Blade/Navbar';

function HomeSlider() {

  useEffect(() => {
    // وظائف لتحويل كل حرف إلى <span>
    const wrapLetters = (selectors) => {
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.innerHTML = element.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        });
      });
    };

    wrapLetters(['.ml12', '.ml10 .letters', '.ml13', '.ml14 .letters']);

    // أنيميشنز لكل حرف
    const animateLetters = () => {
      anime.timeline({ loop: true })
      .add({
        targets: '.ml14 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeInOutExpo",
        duration: 900
      }).add({
        targets: '.ml14 .letter',
        opacity: [0,1],
        translateX: [40,0],
        translateZ: 0,
        scaleX: [0.3, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=600',
        delay: (el, i) => 150 + 25 * i
      }).add({
        targets: '.ml14',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });

      // يمكنك إضافة المزيد من الأنيميشنز هنا
    };

    animateLetters();

    // ScrollReveal
    ScrollReveal().reveal('.ml12', {
      origin: 'top',
      distance: '60px',
      duration: 800,
      delay: 500,
      reset: true
    });

    // Swiper
    new Swiper('.swiper-container', {
      effect: 'cards',
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      spaceBetween: 30
    });

    // وظائف إضافية من الكود القديم إن وجدت
  }, []);

  return (
    <section className="home-page">
    <Navbar />
      <Carousel id="carouselExampleCaptions">
        <Carousel.Item          className="carousel-item active">
          
          <img src={Slider1} className="d-block img-fluid" alt="First slide" />
          <Carousel.Caption className="d-none d-md-block">
            <p>Welcome To Our Firm</p>
            <h1 className="ml12">Excellence in Law Services</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Slider2} className="d-block img-fluid" alt="Second slide" />
          <Carousel.Caption className="d-none d-md-block">
            <p>Professional Legal Advice</p>
            <h1 className="ml12">Trusted by Clients</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Slider3} className="d-block img-fluid" alt="Third slide" />
          <Carousel.Caption className="d-none d-md-block">
            <p>Leading Law Experts</p>
            <h1 className="ml12">Your Legal Partners</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={Slider4} className="d-block img-fluid" alt="Fourth slide" />
          <Carousel.Caption className="d-none d-md-block">
            <p>Reliable Legal Solutions</p>
            <h1 className="ml12">For All Your Needs</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default HomeSlider;
