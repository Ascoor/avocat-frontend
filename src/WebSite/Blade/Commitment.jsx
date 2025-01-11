import { useEffect } from 'react';
import anime from 'animejs';

function Commitment() {
  useEffect(() => {
    const animateText = () => {
      anime({
        targets: '.word',
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 500,
        delay: anime.stagger(500, { start: 100 }),
      });
    };

    animateText();
  }, []);

  const text =
    'نؤمن بأن كل شخص يستحق أن يُسمع صوته، وأن كل مظلمة تستحق أن تُرفع وتُناضل من أجلها...';
  const words = text.split(' ').map((word, index) => (
    <span key={index} className="word">
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
