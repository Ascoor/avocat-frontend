import React from 'react';
import ServicesSection from './Blade/ServicesSection';
import AboutSection from './Blade/AboutSection';
import Commitment from './Blade/Commitment';
import MapSection from './Blade/MapSection';
import HomeCarousel from './Blade/HomeCarousel';
const Home = () => {
  return (
    <>
      <HomeCarousel />
      <ServicesSection /> {/* Services offered */}
      <AboutSection /> {/* About us section */}
      <Commitment /> {/* Commitment or other specific content */}
      <MapSection />
    </>
  );
};
export default Home;
