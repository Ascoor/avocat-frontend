import lawyer1 from '../../assets/img/lawyerr4.jpeg';
import lawyer2 from '../../assets/img/lawyer5.jpeg';
import lawyer3 from '../../assets/img/lawyer6.jpeg';

const slogans = [
  'أفوكات - للحقوق والعدالة',
  'تجربة قانونية استثنائية مع أفوكات',
  'استشارة قانونية تغير مجرى قضيتك',
  'أفوكات - تمثيل قانوني متميز',
  'حلول قانونية مبتكرة مع أفوكات',
];

const images = [lawyer1, lawyer2, lawyer3];

const LawyerService = () => {
  const carouselItems = images.map((image, index) => (
    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
      <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
      <div className="carousel-caption">
        <h3 className="slogan">{slogans[index]}</h3>
      </div>
    </div>
  ));

  return (
    <div
      id="lawyerCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="false"
    >
      <div className="carousel-inner">{carouselItems}</div>
    </div>
  );
};

export default LawyerService;
