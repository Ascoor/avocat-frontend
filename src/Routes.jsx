import { Routes, Route } from 'react-router-dom';
import Home from './WebSite/Home';
import Contact from './WebSite/Contact';
import About from './WebSite/About';
import Atorneys from './WebSite/Atorney';
import FileUploadComponent from './WebSite/FileUploadComponent';
import SearchCourt from './WebSite/SearchCourt';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/atorney" element={<Atorneys />} />
      <Route path="/upload_pdf" element={<FileUploadComponent />} />
      <Route path="/court_search" element={<SearchCourt />} />
    </Routes>
  );
};

export default HomeRoutes;
