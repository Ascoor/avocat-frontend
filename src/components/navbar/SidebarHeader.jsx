import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import { useTransition, animated, useSpring,config } from "@react-spring/web";
import { MdHome, MdPeople, MdOutlineDashboard, MdSpaceDashboard, MdBusiness, MdSearch, MdSettings } from "react-icons/md";
import {  FaGavel } from "react-icons/fa";


const SidebarHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const [selectedLink, setSelectedLink] = useState("/");

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };
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

  // Function to handle mouse movement on the right side of the page
  const handleMouseMove = (e) => {
    // Check if the mouse is on the right side of the page
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const screenWidth = window.innerWidth;
    const threshold = 50; // You can adjust this threshold value as needed
    if (clientX > screenWidth - threshold) {
      setHeaderVisible(true);
    }
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

  const activeTabStyle = useSpring({
    opacity: 1,
    transform: "scale(1.1)",
    from: { opacity: 0, transform: "scale(1)" },
    config: { tension: 300, friction: 15 },
  });

  const inactiveTabStyle = useSpring({
    opacity: 0.6,
    transform: "scale(1)",
    config: { tension: 300, friction: 15 },
  });
  return (
    <>
       <div
  className="mobile-nav-toggle"
  onClick={toggleHeaderVisibility}
  onMouseEnter={handleHeaderMouseEnter}
  onMouseLeave={handleHeaderMouseLeave}
  onMouseMove={handleMouseMove} // قم بتحريك هذا السطر هنا
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
            <Link
              to="/"
              className={`nav-link scrollto ${
                selectedLink === "/" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/")}
            >
              <animated.div
                style={
                  selectedLink === "/"
                    ? activeTabStyle
                    : inactiveTabStyle
                }
              >
                <MdHome size={24} />
              </animated.div>
              <span>الرئيسية</span>
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className={`nav-link scrollto ${
                selectedLink === "/clients" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/clients")}
            >
              <animated.div
                style={
                  selectedLink === "/clients"
                    ? activeTabStyle
                    : inactiveTabStyle
                }
              >
                <MdPeople size={24} />
              </animated.div>
              <span>العملاء</span>
            </Link>
          </li>
          <li>
      <Link
        to="/legcases"
        className={`nav-link scrollto ${
          selectedLink === "/legcases" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/legcases")}
      >
        <animated.div
          style={selectedLink === "/legcases" ? activeTabStyle : inactiveTabStyle}
        >
          <FaGavel size={24} />
          <span>القضايا</span>
        </animated.div>
      </Link>
    </li>
    <li>
      <Link
        to="/courts"
        className={`nav-link scrollto ${
          selectedLink === "/courts" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/courts")}
      >
        <animated.div
          style={selectedLink === "/courts" ? activeTabStyle : inactiveTabStyle}
        >
          <MdBusiness size={24} />
          <span>إعداد المحاكم</span>
        </animated.div>
      </Link>
    </li>
    <li>
      <Link
        to="/court_search"
        className={`nav-link scrollto ${
          selectedLink === "/court_search" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/court_search")}
      >
        <animated.div
          style={
            selectedLink === "/court_search" ? activeTabStyle : inactiveTabStyle
          }
        >
          <MdSearch size={24} />
          <span>بحث المحاكم</span>
        </animated.div>
      </Link>
    </li>
    <li>
      <Link
        to="/cases_setting"
        className={`nav-link scrollto ${
          selectedLink === "/cases_setting" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/cases_setting")}
      >
        <animated.div
          style={
            selectedLink === "/cases_setting" ? activeTabStyle : inactiveTabStyle
          }
        >
          <MdSettings size={24} />
          <span>إعداد القضايا</span>
        </animated.div>
      </Link>
    </li>
            </ul>
          </nav>
          </div>
        </animated.div>
      ))}
    </>
  );
};

export default SidebarHeader;
