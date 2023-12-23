import React, { useEffect } from "react";
import anime from 'animejs';

function Commitment() {

  useEffect(() => {
    // تأثير الحركة للعنوان 'التزام'
    anime({
      targets: '.commitment-info > p:first-of-type',
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000
    });

    // تقسيم النص إلى كلمات وتطبيق التأثير على كل كلمة
    const words = document.querySelectorAll('.commitment-info > p:last-of-type span');
    words.forEach((word, index) => {
      anime({
        targets: word,
        translateX: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: 500 + index * 100 // تأخير يزداد مع كل كلمة
      });
    });
  }, []);

  // تقسيم النص إلى كلمات
  const text = "تلتزم الشركة بقوة أن كل حالة ، سواء كانت صغيرة أو كبير ، سيتم إيلاء الاهتمام والتفاصيل الكاملة في التعامل مع في نفس الوقت ، يجب أن يكون التفاني والمعرفة معطى لكل حالة.";
  const words = text.split(" ").map((word, index) => (
    <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}>
      <span style={{ display: 'inline-block' }}>{word} </span>
    </span>
  ));

  return (
    <section className="commitment" id="commitment">
      <div className="commitment-info">
        <p>التزام</p>
        <p>{words}</p>
      </div>
    </section>
  );
}

export default Commitment;
