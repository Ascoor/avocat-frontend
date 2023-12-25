import React, { useState , useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { Slider1, Slider2, Slider3, Slider4 } from '../../images/index';
import anime from 'animejs';

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
    
return (
<section className="home-page">
   
<Carousel>
 <Carousel.Item>
   <img src={Slider1} className="d-block img-fluid" alt="نظام أفوكات لإدارة مكاتب المحاماة" />
   <Carousel.Caption>
     <p className="animated-p">{wrapLetters("تنظيم أعمالك القانونية بكفاءة")}</p>
   </Carousel.Caption>
 </Carousel.Item>
 <Carousel.Item>
   <img src={Slider2} className="d-block img-fluid" alt="إدارة الملفات والوثائق" />
   <Carousel.Caption>
     <p className="animated-p">{wrapLetters("إدارة الملفات والوثائق بسلاسة")}</p>
   </Carousel.Caption>
 </Carousel.Item>
 <Carousel.Item>
   <img src={Slider3} className="d-block img-fluid" alt="تتبع القضايا والمهام" />
   <Carousel.Caption>
     <p className="animated-p">{wrapLetters("تتبع القضايا والمهام بدقة")}</p>
   </Carousel.Caption>
 </Carousel.Item>
 <Carousel.Item>
   <img src={Slider4} className="d-block img-fluid" alt="حلول متكاملة لمكاتب المحاماة" />
   <Carousel.Caption>
     <p className="animated-p">{wrapLetters("حلول متكاملة لمكاتب المحاماة")}</p>
   </Carousel.Caption>
 </Carousel.Item>
 </Carousel>
</section>
)
}
export default HomeCarousel