import { Routes, Route } from 'react-router-dom';
import Home from './WebSite/Home';
import Contact from './WebSite/Contact';
import About from './WebSite/About';
import Atorneys from './WebSite/atorney'; 

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/atorney" element={<Atorneys />} /> 
    </Routes>
  );
};

export default HomeRoutes;
