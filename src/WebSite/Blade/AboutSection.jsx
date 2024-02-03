import { useEffect } from 'react';
import { AboutUs } from '../../assets/img/index';
import anime from 'animejs';
import ScrollReveal from 'scrollreveal';

function AboutSection() {
  useEffect(() => {
    // Function to wrap each letter in a span for Arabic text support
    const wrapLetters = () => {
      const elements = document.querySelectorAll('.ml14 .letters');
      elements.forEach((element) => {
        element.innerHTML = element.textContent.replace(
          /(.)/g,
          "<span class='letter'>$&</span>",
        );
      });
    };

    wrapLetters();

    // Anime.js Animation for each letter
    anime
      .timeline()
      .add({
        targets: '.ml14 .letter',
        translateX: [-40, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: '.ml14 .letter',
        translateX: [0, 30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      });

    // تهيئة ScrollReveal
    ScrollReveal().reveal('.about__img-overlay, .about__container', {
      origin: 'top',
      distance: '50px',
      duration: 1000,
      delay: 400,
      reset: true,
      viewFactor: 0.1, // تظهر العناصر عندما يكون 10% منها في العرض
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
                  <span className="letters">مكتب أفوكات</span>
                  <span className="line"></span>
                </span>
              </h2>
              <p>
                في <strong>مكتب أفوكات للمحاماة</strong>، نرحب بكم في عالم
                القانون الذي يمزج بين التراث والابتكار. نحن نفتخر بكوننا جيلًا
                جديدًا من المحامين في مصر، نقدم خدمات قانونية متطورة ومتكاملة
                تلبي تطلعات عملائنا وتفوق توقعاتهم. نتميز بخبرتنا الواسعة ونهجنا
                المتجدد، متكيفين دائمًا مع التطورات التكنولوجية والتحديات
                القانونية المعاصرة.
                <br />
                <br />
                نعتز بفريقنا المتخصص من المحامين والمستشارين القانونيين الذين
                يجمعون بين الخبرة العميقة والتفاني في العمل، مما يمكّننا من
                تقديم حلول قانونية مبتكرة وفعالة. نحن ملتزمون بتحقيق النجاح
                لعملائنا، مع التركيز على فهم دقيق للسياقات التجارية والتنظيمية،
                لنكون دائمًا خطوة للأمام.
              </p>

              <div className="see-more-btn my-1">
                <a href="about.html">شاهد المزيد</a>
              </div>
            </div>
          </div>
          <div className="about__img col-md-5 d-flex justify-content-center">
            <div className="about__img-overlay">
              <img alt="" className="about__img-one img-fluid" src={AboutUs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
