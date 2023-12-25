import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoText } from '../../images/index';

function Navbar() {
  return (
    <>
      {/* ... other code ... */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img alt="logo img" className="img-fluid" src={LogoText} width="80px" />
          </a>
          {/* ... other code ... */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link">بيت</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">اتصال</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">اتصال</NavLink>
              </li>
              {/* Remove other <li> elements or update as needed */}
            </ul>
            {/* ... other code ... */}
          </div>
        </div>
      </nav>
      {/* ... other code ... */}
    </>
  );
}

export default Navbar;
