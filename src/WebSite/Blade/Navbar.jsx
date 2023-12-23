import React from 'react';
import {LogoText} from '../../images/index'
function Navbar() {
  return (
    <>
     
<header className="header" id="header">
<div className="top-section">
<div className="container">
<div className="left-side-info d-flex align-items-center">
<div className="d-flex align-items-center h-100 me-3">
<i className="bx bxs-envelope px-1"></i>
<a className="email" href="#">info@info.com</a>
</div>
<div className="d-flex align-items-center h-100">
<i className="bx bxs-phone px-1"></i>
<a className="phone" href="#">00971234567</a>
</div>
</div>
<div className="right-side-icons d-flex align-items-center">
<div className="follow-btn">
<a href="#">متابعة</a>
</div>
<div className="media-icons ps-3">
<a className="facebook" href="#"><i className="bx bxl-facebook"></i></a>
<a className="twitter" href="#"><i className="bx bxl-twitter"></i></a>
<a className="linkedin" href="#"><i className="bx bxl-linkedin"></i></a>
</div>
</div>
</div>
</div>
<nav className="navbar navbar-expand-lg navbar-light bg-white">
<div className="container">
<a className="navbar-brand" href="index.html"><img alt="logo img" className="img-fluid" src={LogoText} width="80px"/></a>
<button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav m-auto mb-2 mb-lg-0">
<li className="nav-item">
<a aria-current="page" className="nav-link active" href="index.html">بيت</a>
</li>
<li className="nav-item">
<a aria-current="page" className="nav-link" href="about.html">عن</a>
</li>
<li className="nav-item">
<a aria-current="page" className="nav-link" href="practice.html">منطقة الممارسة</a>
</li>
<li className="nav-item">
<a aria-current="page" className="nav-link" href="atorney.html">محامي</a>
</li>
<li className="nav-item">
<a aria-current="page" className="nav-link" href="blog.html">مدونة</a>
</li>
<li className="nav-item">
<a aria-current="page" className="nav-link" href="contact.html">اتصال</a>
</li>
</ul>
<div className="request-btn d-flex">
<a className="button-hover mx-1" data-bs-target="#exampleModal" data-bs-toggle="modal" href="#">طلب الاستشارة</a>
<a className="button-hover" href="#">ملف الشركة</a>
</div>
</div>
</div>
</nav>
</header>
    </>
  );
}

export default Navbar;
