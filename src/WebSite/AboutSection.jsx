import React, { useEffect } from 'react';
import { AboutUs } from '../images';
import anime from 'animejs';

import ScrollReveal from 'scrollreveal';

function AboutSection() {

  useEffect(() => {
    // Function to wrap each letter in a span for Arabic text support
    const wrapLetters = () => {
      const elements = document.querySelectorAll('.ml14 .letters');
      elements.forEach(element => {
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

    // ScrollReveal configuration
    ScrollReveal().reveal('.about__img-overlay, .about__container', {
      origin: 'top',
      distance: '50px',
      duration: 1000,
      delay: 400,
      reset: true
    });
  }, []);

  return (
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
  );
}

export default AboutSection;
