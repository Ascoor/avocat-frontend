import ServicesSection from './Blade/ServicesSection';
import AboutSection from './Blade/AboutSection';
import Commitment from './Blade/Commitment';

import MapSection from './Blade/MapSection';
import HomeCarousel from './Blade/HomeCarousel';
const Home = () => {
  return (
    <>
      <HomeCarousel />
      <ServicesSection />
      <AboutSection />
      <Commitment />
      <MapSection />
    </>
  );
};
export default Home;
