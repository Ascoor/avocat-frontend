import React, { useEffect, useState } from "react";
import { Slider1, Slider2, Slider3, Slider4, CriminalLaw, RealEstate, FamilyLaw, Investment, CivelLaw, LabourLaw, AboutUs } from '../images/index';
import Carousel from "react-bootstrap/Carousel";
import anime from 'animejs';
import ScrollReveal from "scrollreveal";
import Swiper from "swiper";
import Navbar from "./Blade/Navbar";
import Footer from "./Blade/Footer";

export default function WebSite() {
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [CriminalLaw, RealEstate, FamilyLaw, Investment, CivelLaw, LabourLaw];

    useEffect(() => {
        // Function to wrap each letter in a span for Anime.js
        const wrapLetters = () => {
            document.querySelectorAll('.ml14 .letters').forEach(element => {
                element.innerHTML = element.textContent.replace(/(.)/g, "<span class='letter'>$&</span>");
            });
        };
        wrapLetters();

        // Anime.js Animation for each letter
        anime.timeline({ loop: true })
            .add({
                targets: '.ml14 .letter',
                translateX: [-40, 0],
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            })
            .add({
                targets: '.ml14 .letter',
                translateX: [0, 30],
                opacity: [1, 0],
                easing: "easeInExpo",
                duration: 1100,
                delay: (el, i) => 100 + 30 * i
            });

        // ScrollReveal configuration for various elements
        ScrollReveal().reveal('.srvices__content, .about__img-overlay, .about__container, .ml12', {
            origin: 'top',
            distance: '50px',
            duration: 1000,
            delay: 400,
            interval: 200,
            reset: true
        });

        // Swiper initialization
        new Swiper('.swiper-container', {
            effect: 'cards',
            grabCursor: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            spaceBetween: 30
        });

        // Carousel Auto-slide
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <main className="main" id="main">
        
<section className="home-page" id="home-page">
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
    <section className="srvices home-page-items">
    <div className="services-slider">
    <div className="carousel slide" data-bs-ride="carousel" id="carouselExampleIndicators">
    <div className="carousel-indicators">
    <button aria-current="true" aria-label="Slide 1" className="active" data-bs-slide-to="0" data-bs-target="#carouselExampleIndicators" type="button"></button>
    <button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#carouselExampleIndicators" type="button"></button>
    <button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carouselExampleIndicators" type="button"></button>
    <button aria-label="Slide 4" data-bs-slide-to="3" data-bs-target="#carouselExampleIndicators" type="button"></button>
    <button aria-label="Slide 5" data-bs-slide-to="4" data-bs-target="#carouselExampleIndicators" type="button"></button>
    </div>
    <div className="carousel-inner">
    <div className="carousel-item active">
    <img alt="criminal law img"  src={CriminalLaw} /><br/>
    <a href="#">قانون جنائي</a>
    </div>
    <div className="carousel-item">
    <img alt="Real Estate img" src={RealEstate}/>
    <a href="#">العقارات</a>
    </div>
    <div className="carousel-item">
    <img alt="Family Law img"   src={FamilyLaw}/>
    <a href="#">قانون العائلة</a>
    </div>
    <div className="carousel-item">
    <img alt="Investment img"   src={Investment}/>
    <a href="#">استثمار</a>
    </div>
    <div className="carousel-item">
    <img alt="Investment img"   src={CivelLaw}/>
    <a href="#">القانون المدني</a>
    </div>
    </div>
    <button className="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleIndicators" type="button">
    <span aria-hidden="true" className="carousel-control-prev-icon"></span>
    <span className="visually-hidden">سابق</span>
    </button>
    <button className="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleIndicators" type="button">
    <span aria-hidden="true" className="carousel-control-next-icon"></span>
    <span className="visually-hidden">التالي</span>
    </button>
    </div>
    </div>    
<div className="container srvices-items">
<div className="srvices__content">
<img alt="criminal law img" className="about__img-one" src={CriminalLaw}/>
<a href="#">قانون جنائي</a>
</div>
<div className="srvices__content">
<img alt="Real Estate img" className="about__img-one" src={RealEstate}/>
<a href="#">العقارات</a>
</div>
<div className="srvices__content">.
<img alt="Family Law img" className="about__img-one" src={FamilyLaw}/>
<a href="#">قانون العائلة</a>
</div>
<div className="srvices__content">
<img alt="Labour Law img" className="about__img-one"  src={LabourLaw}/>
<a href="#">قانون العمل</a>
</div>
<div className="srvices__content">
<img alt="Investment img" className="about__img-one" src={Investment} />
<a href="#">استثمار</a>
</div>
<div className="srvices__content">
<img alt="Investment img" className="about__img-one" src={CivelLaw}/>
<a href="#">القانون المدني</a>
</div>
</div>

</section>

<section className="about py-5" id="about">
      <div className="container">
        <div className="about__container row">
          <div className="about__data col-md-7">
            <div className="law-firm-info">
              <h2 className="ml14">
                <span className="text-wrapper">
                  <span className="letters">مكتب المحاماة</span>
                  <span className="line"></span>
                </span>
              </h2>
       
          
<p> 
                                     We Are The Next Generation Of Lawyers Engineering Legal Services
                                     According To The Needs Of Our Clients And Developing
                                     Technology. Though We Are A Full Spectrum Emirati Law Firm, We
                                     Have A Diverse, Experienced, And Multinational Group Of Lawyers &amp;
                                     Legal Consultants Which Give Us The Advantage Over Other Law<br/>
                                     Firms.
                                 <br/><br/>
                                     Our Strength Lies In A Complete Understanding Of The Regulatory,
                                     Legal, And Commercial Changes Happening Across The Various
                                     Industries. We Provide Bespoke Counsel To Help Our Clients
                                     Achieve Their Objectives.
                                 
              </p>
              <div className="see-more-btn my-1">
                <a href="about.html">شاهد المزيد</a>
              </div>
            </div>
          </div>
          <div className="about__img col-md-5 d-flex justify-content-center">
            <div className="about__img-overlay">
              <img alt="" className="about__img-one img-fluid" src={AboutUs}/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="commitment" id="commitment">
        <div className="commitment-info">
          <p>التزام</p>
          <p>
            تلتزم الشركة بقوة أن كل حالة ، سواء كانت صغيرة أو
            كبير ، سيتم إيلاء الاهتمام والتفاصيل الكاملة في التعامل مع
            في نفس الوقت ، يجب أن يكون التفاني والمعرفة
            معطى لكل حالة.
          </p>
        </div>
      </section>
      <section className="map" id="map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d587.0731446004598!2d31.3953203545629!3d31.045759675700598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1703265606749!5m2!1sar!2seg" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
<Footer />
      </main>
    );
    
}