import React from "react";

function Commitment() {
  return (
    <>
      <section className="commitment" id="commitment">
        <div className="commitment-info">
          <p>التزام</p>
          <p>
            تلتزم الشركة بقوة أن كل حالة ، سواء كانت صغيرة أو
            كبير ، سيتم إيلاء الاهتمام والتفاصيل الكاملة في التعامل مع
            في نفس الوقت ، يجب أن يكون التفاني والمعرفة
            معطى لكل حالة.
          </p>
        </div>
      </section>
      <section className="map" id="map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d587.0731446004598!2d31.3953203545629!3d31.045759675700598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1703265606749!5m2!1sar!2seg" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
    </>
  );
}

export default Commitment;
