import React, { useEffect } from "react";
import anime from 'animejs';

function Commitment() {
  useEffect(() => {
    // تأثير الحركة للنص كأنه يُكتب، كلمة بكلمة
    anime({
      targets: '.commitment-info > p .word',
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 500,
      delay: anime.stagger(500) // تأخير يزداد مع كل كلمة
    });
  }, []);

  // تقسيم النص إلى كلمات بدلاً من حروف
  const text = "نؤمن بأن كل شخص يستحق أن يُسمع صوته، وأن كل مظلمة تستحق أن تُرفع وتُناضل من أجلها...";
  const words = text.split(" ").map((word, index) => (
    <span key={index} className="word" style={{ display: 'inline-block', opacity: 0, marginRight: '0.5em' }}>
      {word + ' '}
    </span>
  ));

  return (
    <section className="commitment" id="commitment">
      <div className="commitment-info">
        <p>عهد و إلتزام</p>
        <p>{words}</p>
      </div>
    </section>
  );
}

export default Commitment;
