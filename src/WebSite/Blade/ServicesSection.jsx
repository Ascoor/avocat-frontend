import { useEffect, useState } from 'react';
import {
  CivelLaw,
  CriminalLaw,
  FamilyLaw,
  Investment,
  LabourLaw,
  RealEstate,
} from '../../assets/img/index';
import ScrollReveal from 'scrollreveal';

function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      id: 1,
      title: 'Civel Law',
      image: CivelLaw,
      description: 'Civel Law',
    },
    {
      id: 2,
      title: 'Criminal Law',
      image: CriminalLaw,
      description: 'Criminal Law',
    },
    {
      id: 3,
      title: 'Family Law',
      image: FamilyLaw,
      description: 'Family Law',
    },
    {
      id: 4,
      title: 'Labour Law',
      image: LabourLaw,
      description: 'Labour Law',
    },
    {
      id: 5,
      title: 'Real Estate Law',
      image: RealEstate,
      description: 'Real Estate Law',
    },
    {
      id: 6,
      title: 'Investment Law',
      image: Investment,
      description: 'Investment Law',
    },
  ];
  useEffect(() => {
    // Carousel auto-slide
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    // ScrollReveal animation
    ScrollReveal().reveal('.srvices__content', {
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 400,
      interval: 200,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="srvices home-page-items">
      <div className="services-slider">
        <div
          className="carousel slide"
          data-bs-ride="carousel"
          id="carouselExampleIndicators"
        >
          <div className="carousel-indicators">
            <button
              aria-current="true"
              aria-label="Slide 1"
              className="active"
              data-bs-slide-to="0"
              data-bs-target="#carouselExampleIndicators"
              type="button"
            ></button>
            <button
              aria-label="Slide 2"
              data-bs-slide-to="1"
              data-bs-target="#carouselExampleIndicators"
              type="button"
            ></button>
            <button
              aria-label="Slide 3"
              data-bs-slide-to="2"
              data-bs-target="#carouselExampleIndicators"
              type="button"
            ></button>
            <button
              aria-label="Slide 4"
              data-bs-slide-to="3"
              data-bs-target="#carouselExampleIndicators"
              type="button"
            ></button>
            <button
              aria-label="Slide 5"
              data-bs-slide-to="4"
              data-bs-target="#carouselExampleIndicators"
              type="button"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img alt="criminal law img" src={CriminalLaw} />
              <br />
              <a href="#">قانون جنائي</a>
            </div>
            <div className="carousel-item">
              <img alt="Real Estate img" src={RealEstate} />
              <a href="#">العقارات</a>
            </div>
            <div className="carousel-item">
              <img alt="Family Law img" src={FamilyLaw} />
              <a href="#">قانون العائلة</a>
            </div>
            <div className="carousel-item">
              <img alt="Investment img" src={Investment} />
              <a href="#">استثمار</a>
            </div>
            <div className="carousel-item">
              <img alt="Investment img" src={LabourLaw} />
              <a href="#">القانون المدني</a>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            data-bs-slide="prev"
            data-bs-target="#carouselExampleIndicators"
            type="button"
          >
            <span
              aria-hidden="true"
              className="carousel-control-prev-icon"
            ></span>
            <span className="visually-hidden">سابق</span>
          </button>
          <button
            className="carousel-control-next"
            data-bs-slide="next"
            data-bs-target="#carouselExampleIndicators"
            type="button"
          >
            <span
              aria-hidden="true"
              className="carousel-control-next-icon"
            ></span>
            <span className="visually-hidden">التالي</span>
          </button>
        </div>
      </div>
      <div className="container srvices-items">
        <div className="srvices__content">
          <img
            alt="criminal law img"
            className="about__img-one"
            src={CriminalLaw}
          />
          <a href="#">قانون جنائي</a>
        </div>
        <div className="srvices__content">
          <img
            alt="Real Estate img"
            className="about__img-one"
            src={RealEstate}
          />
          <a href="#">العقارات</a>
        </div>
        <div className="srvices__content">
          <img
            alt="Family Law img"
            className="about__img-one"
            src={FamilyLaw}
          />
          <a href="#">قانون العائلة</a>
        </div>
        <div className="srvices__content">
          <img
            alt="Labour Law img"
            className="about__img-one"
            src={LabourLaw}
          />
          <a href="#">قانون العمل</a>
        </div>
        <div className="srvices__content">
          <img
            alt="Investment img"
            className="about__img-one"
            src={Investment}
          />
          <a href="#">استثمار</a>
        </div>
        <div className="srvices__content">
          <img alt="C img" className="about__img-one" src={CivelLaw} />
          <a href="#">القانون المدني</a>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
