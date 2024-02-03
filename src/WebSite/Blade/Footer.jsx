const Footer = () => {
  return (
    <section
      className="footer"
      id="map"
      style={{ position: 'relative', zIndex: 2 }}
    >
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>تواصل معنا</h3>
              <p>يمكنك التواصل معنا باستخدام المعلومات التالية:</p>
              <p>
                البريد الإلكتروني:{' '}
                <a href="mailto:Avocat@Avocat.live">Avocat@Avocat.live</a>
              </p>
              <p>
                الهاتف: <a href="tel:050-2305699">050-2305699</a>,{' '}
                <a href="tel:011-22242888">011-22242888</a>,{' '}
                <a href="tel:011-14861131">011-14861131</a>
              </p>
              <p>
                العنوان: جمهورية مصر العربية - الدقهلية - المنصورة - شارع الجيش
                - برج التجارة - الدور 12
              </p>
            </div>
            <div className="col-md-4">
              <h3>ساعات العمل</h3>
              <p>السبت - الخميس: 10 صباحًا - 10 مساءً</p>
              <p>الجمعة: عطلة</p>
            </div>
            <div className="col-md-4">
              <h3>تابعنا على وسائل التواصل الاجتماعي</h3>
              <a
                className="facebook"
                href="https://www.facebook.com/Avocat.Lawfirm/"
              >
                <i className="bx bxl-facebook"></i> فيسبوك
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <p>© أفوكات مكتب محاماة. جميع الحقوق محفوظة. 2023</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
