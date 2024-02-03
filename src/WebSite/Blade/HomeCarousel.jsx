import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import anime from 'animejs';
import { Slider1, Slider2, Slider3, Slider4 } from '../../assets/img/index';
const carouselItems = [
  {
    imgSrc: Slider1,
    caption: 'التحول الرقمى للخدمات القانونية',
    shortCaption:
      'هل أنت مستعد لمواكبة التطور التكنولجى فى تقديم الخدمات القانونية بأداوات تسهل من أداء الخدمات القانونية بشكل أسرع وأفضل',
  },
  {
    imgSrc: Slider2,
    caption: 'إحتراف ممارسة الدفاع',
    shortCaption:
      'إعداد المذكرات والدفوع يطرق أفضل وبواسطة أدوات تمكنك من دفاعك بشكل إحترافى',
  },
  {
    imgSrc: Slider3,
    caption: 'مساعد ذكى يلبى تحديات التحول الرقمى ',
    shortCaption:
      'أفوكات تطبيق المحاماة الأول الذى يتلائم مع  التحول الرقمى للمحاماة بشكل أسرع وأفضل مدعم بوسائل الذكاء الإصطناعى فى تنظيم أعمال مكتب المحاماة',
  },
  {
    imgSrc: Slider4,

    caption: 'قاعدة الأحكام والتشريعات',
    shortCaption:
      'قاعدة بيانات شاملة الاحكام والتشريعات وفق أحدث التعديلات بنظام بحث متطور يمنحك سهولة بالغة فى الوصول الى الأحكام المراد الوصول اليها بخكاوت بسيطة وسهلة',
  },
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
    charTimeline
      .add({
        targets: '.animated-caption .animated-char',
        opacity: [0, 1],
        translateX: [-50, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: (el, i) => 100 * i,
      })
      .add({
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
    <section className="home-page" style={{ position: 'relative', zIndex: 1 }}>
      <Carousel
        activeIndex={currentSlide}
        onSelect={(selectedIndex) => setCurrentSlide(selectedIndex)}
        interval={5000}
      >
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index} className="home-page carousel-item">
            <div className="carousel-item active">
              <img
                src={item.imgSrc}
                className="d-block img-fluid"
                alt={item.caption}
              />
              <div className="carousel-caption d-none d-md-block">
                <div className="caption">
                  <h1 className="animated-caption">{item.caption}</h1>
                  <h3 className="animated-caption-short">
                    {item.shortCaption}
                  </h3>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};
export default HomeCarousel;
