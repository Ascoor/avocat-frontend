import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import { useTransition, animated } from "@react-spring/web";

const SidebarHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(true);

  const transitions = useTransition(headerVisible, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: { duration: 300 } // Adjust the duration as needed
  });

  // Function to toggle header visibility
  const toggleHeaderVisibility = () => {
    setHeaderVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      setHeaderVisible(false); // Hide the header after some idle time
    }, 3000); // Change the value according to your preference

    return () => clearTimeout(loadingDelay);
  }, []);

  // Reset the header visibility on mouse move over the header
  const handleHeaderMouseEnter = () => {
    setHeaderVisible(true);
  };

  // Hide the header on mouse leave from the header area
  const handleHeaderMouseLeave = () => {
    setHeaderVisible(false);
  };

  const getUserName = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user ? user.name : "";
  };

  return (
    <>
      <div className="mobile-nav-toggle" onClick={toggleHeaderVisibility}>
        {/* Use the imported icons instead of <i> */}
        {transitions((styles, item) =>
          item ? (
            <animated.div style={styles}>
              <BiList size={24} />
            </animated.div>
          ) : (
            <animated.div style={styles}>
              <BiX size={24} />
            </animated.div>
          )
        )}
      </div>

      {transitions((styles, item) => (
        <animated.div
          id="header"
          style={{ ...styles, display: item ? "block" : "none" }}
          onMouseEnter={handleHeaderMouseEnter}
          onMouseLeave={handleHeaderMouseLeave}
        >
          <div className="d-flex flex-column">
            <div className="profile">
              <img src={logo} alt="" className="img-fluid rounded-circle" />
              <h1 className="text-light">
                <Link to="/">المستشار/{getUserName()} </Link>
              </h1>
            </div>

            <div className="profile">
            <img src={logo} alt="" className="img-fluid rounded-circle" />
            <h1 className="text-light">
              <Link to="/">المستشار/{getUserName()} </Link>
            </h1>
          </div>

          <nav id="navbar" className="nav-menu navbar">
            <ul>
              <li>
              <Link to="/" className="nav-link scrollto active">
  <i className="bx bx-home"></i> <MdOutlineDashboard size={24} /> <span>الرئيسية</span>
</Link>
            
              </li>
            <li>
                <Link to="/clients" className="nav-link scrollto">
                  <i className="bx bx-user"></i> <span>العملاء</span>
                </Link>
              </li>
              <li>
                <Link to="/legcases" className="nav-link scrollto">
                  <i className="bx bx-file-blank"></i> <span>القضايا</span>
                </Link>
              </li>
              <li>
                <Link to="/courts" className="nav-link scrollto">
                  <i className="bx bx-book-content"></i> <span>إعداد المحاكم</span>
                </Link>
              </li>
              <li>
                <Link to="/court_search" className="nav-link scrollto">
                  <i className="bx bx-server"></i> <span>بحث المحاكم</span>
                </Link>
              </li>
              <li>
                <Link to="/cases_setting" className="nav-link scrollto">
                  <i className="bx bx-envelope"></i> <span>إعداد القضايا</span>
                </Link>
              </li>  {/* Add your navigation links here */}
            </ul>
          </nav>
          </div>
        </animated.div>
      ))}
    </>
  );
};

export default SidebarHeader;
