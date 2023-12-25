import React, { useEffect } from 'react';
import { CivelLaw, CriminalLaw, FamilyLaw, Investment, LabourLaw, RealEstate } from '../../assets/img/index';
import ScrollReveal from 'scrollreveal';

function ServicesSection() {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: '60px',
      duration: 800,
      // reset: true,
    });

    sr.reveal('.srvices__content', {
      origin: 'top',
      interval: 100,
    });

    // No need to return anything if you don't have an interval to clear
  }, []);

  const serviceItems = [
    {
      imgSrc: CriminalLaw,
      title: "قانون جنائي"
    },
    {
      imgSrc: RealEstate,
      title: "العقارات"
    },
    {
      imgSrc: FamilyLaw,
      title: "قانون العائلة"
    },
    {
      imgSrc: Investment,
      title: "استثمار"
    },
    {
      imgSrc: LabourLaw,
      title: "قانون العمل"
    },
    {
      imgSrc: CivelLaw,
      title: "القانون المدني"
    },
  ];


  return (

    <section className="srvices home-page-items">
      <div className="services-slider">
        <div className="carousel slide" data-bs-ride="carousel" id="carouselExampleIndicators">
          <div className="carousel-indicators">
            {serviceItems.map((item, index) => (
              <button
                key={index}
                aria-label={`Slide ${index + 1}`}
                className={index === 0 ? "active" : ""}
                data-bs-slide-to={index}
                data-bs-target="#carouselExampleIndicators"
                type="button"
              ></button>
            ))}
          </div>
        </div>
      </div>
      <div className="carousel-inner">
        {serviceItems.map((item, index) => (
          <div key={index} className={`srvices__content ${index === 0 ? 'active' : ''}`}>
            <img alt={item.title} className="about__img-one" src={item.imgSrc} />
            <a href="#">{item.title}</a>
          </div>
        ))}
      </div>
    </section>
   
  );
}


export default ServicesSection;
