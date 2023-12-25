import React , { useEffect } from 'react';
import { LogoPatren, Photography, Unsplash1 } from '../../images/index';
import ScrollReveal from 'scrollreveal';

function Footer() {

  useEffect(() => {
    // ScrollReveal animation
    ScrollReveal().reveal('.footer-Lawyers, .footer-info, .footer-items', {
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 400,
      interval: 200
    });
  }, []);

  return (
    <>
    <footer className="footer">
      <div className="container">
        <div className="row row-cols-1 footer-info row-cols-md-4 g-4">
          <div className="col info">
            <img alt="logo img" className="img-fluid" src={LogoPatren} />
            <p>هو قسط كامل ، ممتلئ خدمة المحاماة المحلية والدولية</p>
            <a className="email" href="#">
              <i className="bx bxs-envelope px-1"></i>
              <p>info@info.com</p>
            </a>
            <a className="phone" href="#">
              <i className="bx bxs-phone px-1"></i>
              <p>00971234567</p>
            </a>
            <a className="location px-1" href="#">
              <i className="bx bxs-map"></i>
              <p>فلسطين</p>
            </a>
          </div>
          <div className="col footer-items">
            <ul>
              <li><a href="#">بيت</a></li>
              <li><a href="#">معلومات عنا</a></li>
              <li><a href="#">مجالات التدريب</a></li>
              <li><a href="#">فريقنا</a></li>
              <li><a href="#">مدونة</a></li>
              <li><a href="#">Unaccompleed لنا</a></li>
            </ul>
          </div>
          <div className="col footer-items">
            <ul>
              <li><a href="#">قانون</a></li>
              <li><a href="#">قانون العمل</a></li>
              <li><a href="#">قانون جنائي</a></li>
              <li><a href="#">القانون المدني</a></li>
              <li><a href="#">القانون المالي</a></li>
              <li><a href="#">القانون المالي</a></li>
            </ul>
          </div>
          <div className="col">
            <p>أحدث الأخبار</p>
            <div className="footer-Lawyers d-flex">
              <img alt="footer img" className="img-fluid" src={Unsplash1}/>
              <p className="px-1">المحامون ذوي الخبرة العالية والاستشاريون</p>
            </div>
            <div className="footer-Lawyers d-flex mt-3">
              <img alt="footer img" className="img-fluid" src={Photography}/>
              <p className="px-1">المحامون ذوي الخبرة العالية والاستشاريون</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <p>© المحاماة © جميع الحقوق محفوظة .2021</p>
        </div>
      </div>
    </footer>
      <div aria-hidden="true" aria-labelledby="exampleModalLabel" className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">طلب الاستشارة</h5>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div className="modal-body">
              {/* <form className="row g-2">
                <div className="col-md-6 mt-5">
                  <input className="form-control" placeholder="Name" required type="text" value=""/>
                </div>
                <div className="col-md-6 mt-5">
                  <input className="form-control" placeholder="Phone" required type="phone" value=""/>
                </div>
                <div className="col-md-12 mt-5">
                  <input className="form-control" placeholder="Email" required type="email" value=""/>
                </div>
                <div className="col-12 mt-5">
                  <textarea className="form-control" cols="20" placeholder="Message"></textarea>
                </div>
                <div className="col-12 send-msg mt-5 d-flex justify-content-center">
                  <button className="btn button-hover" type="submit">Send</button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
