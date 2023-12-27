
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Carousel } from 'react-bootstrap';
import anime from 'animejs';
import SpiderWeb from './SpiderWeb';
import { Slider1, Slider2, Slider3, Slider4 } from '../../assets/img/index';
const carouselItems = [
  {
    imgSrc: Slider1,
    caption: "التحول الرقمى للخدمات القانونية",
    shortCaption: "هل أنت مستعد لمواكبة التطور التكنولجى فى تقديم الخدمات القانونية بأداوات تسهل من أداء الخدمات القانونية بشكل أسرع وأفضل",
  },
  {
    imgSrc: Slider2,
    caption: "إحتراف ممارسة الدفاع",
    shortCaption: "إعداد المذكرات والدفوع يطرق أفضل وبواسطة أدوات تمكنك من دفاعك بشكل إحترافى",
  },
  {
    imgSrc: Slider3,
    caption: "مساعد ذكى يلبى تحديات التحول الرقمى ",
    shortCaption: "أفوكات تطبيق المحاماة الأول الذى يتلائم مع  التحول الرقمى للمحاماة بشكل أسرع وأفضل مدعم بوسائل الذكاء الإصطناعى فى تنظيم أعمال مكتب المحاماة",

    },
  {
    imgSrc: Slider4,
 
    caption: "قاعدة الأحكام والتشريعات",
    shortCaption: "قاعدة بيانات شاملة الاحكام والتشريعات وفق أحدث التعديلات بنظام بحث متطور يمنحك سهولة بالغة فى الوصول الى الأحكام المراد الوصول اليها بخكاوت بسيطة وسهلة",
 }
];

const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    const charTimeline = anime.timeline({ autoplay: false });
    charTimeline.add({
      targets: '.animated-caption .animated-char',
      opacity: [0, 1],
      translateX: [-50, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: (el, i) => 100 * i,
    }).add({
      targets: '.animated-caption-short .animated-char',
      opacity: [0, 1],
      translateX: [-50, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: (el, i) => 100 * i,
    });

    const handleSlideChange = () => {
      charTimeline.restart();
    };

    handleSlideChange();

    return () => {
      charTimeline.pause();
    };
  }, [currentSlide]);

  return (
    <section className="home-page">
      <Carousel
        activeIndex={currentSlide}
        onSelect={(selectedIndex) => setCurrentSlide(selectedIndex)}
        interval={5000}
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index} className="home-page carousel-item">
  <div className="carousel-item active">
    <img src={item.imgSrc} className="d-block img-fluid" alt={item.caption} />
    <div className="carousel-caption d-none d-md-block">
      <div className="caption">
        <h1 className="animated-caption">
          {item.caption}
        </h1>
        <h3 className="animated-caption-short">
          {item.shortCaption}
        </h3>
      </div>
    </div>
  </div>
</Carousel.Item>

        ))}
      </Carousel>
      <div className="spider-web-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
        <Canvas style={{ background: 'transparent', alpha: 0.7 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpiderWeb color="silver" lineWidth={0.5} divisions={20} opacity={0.1} />
        </Canvas>
      </div>
    </section>
  );
}

export default HomeCarousel;
