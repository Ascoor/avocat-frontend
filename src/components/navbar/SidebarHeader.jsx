import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import { useTransition, animated, config } from "@react-spring/web";
import { MdOutlineDashboard, MdSpaceDashboard } from "react-icons/md";

const SidebarHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  // Function to toggle header visibility
  const toggleHeaderVisibility = () => {
    setHeaderVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      if (!mouseOver && headerVisible) {
        setHeaderVisible(false); // Hide the header if mouse is not over and it's visible
      }
    }, 1000); // Change the value according to your preference

    return () => clearTimeout(loadingDelay);
  }, [mouseOver, headerVisible]);

  const handleHeaderMouseEnter = () => {
    setHeaderVisible(true);
    setMouseOver(true);
  };

  // Hide the header on mouse leave from the header area
  const handleHeaderMouseLeave = () => {
    setMouseOver(false);
  };

  const transitions = useTransition(headerVisible, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(100%)" },
    config: config.default,
  });

  const getUserName = () => {
    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    return user ? user.name : "";
  };

  return (
    <>
      <div
        className="mobile-nav-toggle"
        onClick={toggleHeaderVisibility}
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
      >
        {transitions((styles, item) => (
          <animated.div style={styles}>
            {item ? (
              <MdSpaceDashboard size={24} />
            ) : (
              <MdOutlineDashboard size={24} />
            )}
          </animated.div>
        ))}
      </div>
      {transitions((styles, item) => (
        <animated.div
          id="header"
          className={item ? "header-visible" : "header-hidden"}
          style={styles}
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
