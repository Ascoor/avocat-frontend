import { useState, useEffect } from 'react';
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

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const animation = anime.timeline({ autoplay: false });
    animation
      .add({
        targets: '.animated-caption',
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutExpo',
        duration: 800,
      })
      .add({
        targets: '.animated-caption-short',
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(100),
      });

    animation.restart();

    return () => animation.pause();
  }, [currentSlide]);

  return (
    <section className="relative">
      <div className="relative w-full h-[500px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={item.imgSrc}
              alt={item.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="animated-caption text-2xl md:text-4xl font-bold mb-4">
                {item.caption}
              </h1>
              <p className="animated-caption-short text-sm md:text-lg">
                {item.shortCaption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HomeCarousel;
