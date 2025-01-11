const Contact = () => {
  const phoneNumber = '+201122242888';
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <section className="contact-us contact-page" id="contact-us">
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-2 g-2 h-100 d-flex align-items-center">
          <div className="col contact-info">
            <h2 className="mb-4">مرحبًا بك في مكتب أفوكات محاماة</h2>
            <p className="mb-4">
              نحن هنا لخدمتك وحماية حقوقك. يمكنك التواصل معنا باستخدام المعلومات
              التالية:
            </p>
            <div className="contact-details">
              <div className="d-flex align-items-center mb-3">
                <i className="bx bxs-envelope px-1"></i>
                <a className="email d-flex" href="mailto:Avocat@Avocat.live">
                  Avocat@Avocat.live
                </a>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bx bxs-phone px-1"></i>
                <a
                  className="email d-flex"
                  href={`tel:050-2305699 | 011-22242888 | 011-14861131`}
                >
                  050-2305699 | 011-22242888 | 011-14861131
                </a>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bx bxs-map"></i>
                <span className="email d-flex">
                  جمهورية مصر العربية - الدقهلية - المنصورة - شارع الجيش - برج
                  التجارة - الدور 12
                </span>
              </div>
            </div>
            <h3 className="mt-4">ساعات العمل</h3>
            <div className="working-hours">
              <div className="d-flex align-items-center">
                <i className="bx bx-time"></i>
                <span className="email d-flex">
                  السبت - الخميس: 10 ص - 10 م
                </span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bx bx-time"></i>
                <span className="email d-flex">الجمعة - عطلة</span>
              </div>
            </div>
            <div className="media-icons ps-3">
              <h3 className="mt-4">تابعنا على وسائل التواصل الاجتماعي</h3>
              <a
                className="facebook"
                href="https://www.facebook.com/Avocat.Lawfirm/"
              >
                <i className="bx bxl-facebook"></i>
              </a>
            </div>
            <div className="media-icons ps-3">
              <h3 className="mt-4">تواصل معنا عبر الواتساب</h3>
              <a className="whatsapp" href={whatsappLink}>
                <i className="bx bxl-whatsapp"></i>
              </a>
            </div>
          </div>
          <div className="col">
            {/* إضافة نموذج الاتصال هنا إذا كنت ترغب */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
