import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white ">
      <div className="container">
        {/* Add 'text-center' class here to center the content */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <p>&copy; {new Date().getFullYear()} Avocat. All rights reserved.</p>
            Designed by <a href="https://ask-ar.com/">ِAskar T.S</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
