import '../index.css';
import Navbar from './Blade/Navbar';
import Footer from './Blade/Footer';
import HomeRoutes from '../Routes';

export default function WebSite() {
  return (
    <main className="main" id="main">
      <Navbar />
      <HomeRoutes /> {/* Assuming this is your home page slider */}
      <Footer />
    </main>
  );
}
