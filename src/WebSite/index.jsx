import React from 'react';
import '../index.css';
import AboutSection from './AboutSection';
import Commitment from './Commitment';
import HomeSlider from './HomeSlider';
import ServicesSection from './ServicesSection';
import MapSection from './Blade/MapSection';
import Footer from './Blade/Footer';


export default function WebSite() {
    return (
        <main>
            <HomeSlider />           {/* Assuming this is your home page slider */}
            <ServicesSection />      {/* Services offered */}
          
            <AboutSection />         {/* About us section */}
            <Commitment />           {/* Commitment or other specific content */}
            <MapSection />   
<Footer />
      </main>
    );
    
}