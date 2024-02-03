import { Link } from 'react-router-dom'; // استخدم Link بدلاً من NavLink
import { LogoText } from '../../assets/img/index';

function Navbar() {
  const phoneNumber = '+201122242888';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  return (
    <header className="header" id="header">
      <div className="top-section">
        <div className="container">
          <div className="left-side-info d-flex align-items-center">
            <div className="d-flex align-items-center h-100 me-3">
              <i className="bx bxs-envelope px-1"></i>
              <a className="email" href="#">
                Avocat@Avocat.live
              </a>
            </div>
            <div className="d-flex align-items-center h-100">
              <i className="bx bxs-phone px-1"></i>
              <a className="phone" href="#">
                050-2305699
              </a>
            </div>
          </div>
          <div className="right-side-icons d-flex align-items-center">
            <div className="follow-btn">
              <a href="#">متابعة</a>
            </div>
            <div className="media-icons ps-3">
              <a
                className="facebook"
                href="https://www.facebook.com/Avocat.Lawfirm/"
              >
                <i className="bx bxl-facebook"></i>
              </a>
              <a className="whatsapp" href={whatsappLink}>
                <i className="bx bxl-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {' '}
            {/* قم باستخدام Link بدلاً من a */}
            <img
              alt="شعار الشركة"
              className="img-fluid"
              src={LogoText}
              width="80px"
            />
          </Link>
          <button
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-bs-target="#navbarSupportedContent"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  اتصل بنا
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upload_pdf" className="nav-link">
                  معلومات عنا
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/atorney" className="nav-link">
                  فريق العمل
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/court_search" className="nav-link">
                  البحث
                </Link>
              </li>
            </ul>
            <div className="request-btn d-flex">
              <a
                className="button-hover mx-1"
                data-bs-target="#exampleModal"
                data-bs-toggle="modal"
              >
                طلب الاستشارة
              </a>
              <a className="button-hover">ملف الشركة</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
