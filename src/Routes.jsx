import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './WebSite/Home';
import Contact from './WebSite/Contact';
import About from './WebSite/About';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default HomeRoutes;
