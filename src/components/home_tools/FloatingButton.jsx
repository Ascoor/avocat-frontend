import { useState, useEffect, useRef } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { createPopper } from '@popperjs/core';
import { useSpring, animated } from '@react-spring/web';
import Draggable from 'react-draggable';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const { x, y, opacity } = useSpring({ x: buttonPosition.x, y: buttonPosition.y, opacity: 1 });

  useEffect(() => {
    // Create a Popper instance for positioning the menu
    const popperInstance = createPopper(buttonRef.current, menuRef.current, {
      placement: 'top',
    });

    return () => {
      // Destroy the Popper instance when the component unmounts
      popperInstance.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the menu position whenever the button position changes
    setMenuPosition({ x: buttonPosition.x, y: buttonPosition.y + 60 }); // Adjust the vertical position as needed
  }, [buttonPosition]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDrag = (e, data) => {
    setButtonPosition({ x: data.x, y: data.y });
    // Reset the timer for hiding the button on drag
    resetHideTimer();
  };

  // Hide the button after 5 seconds of inactivity
  const hideButtonAfterTimeout = () => {
    setIsOpen(false);
  };

  let hideTimer;
  const resetHideTimer = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideButtonAfterTimeout, 5000);
  };

  // Set up the timer on component mount
  useEffect(() => {
    resetHideTimer();
    // Clear the timer on component unmount
    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <Draggable
      onDrag={handleDrag}
      bounds="parent" // Limit the dragging to the parent container
    >
      <animated.div
        className="floating-button-container"
        ref={buttonRef}
        style={{
          '--button-bg-color': '#007BFF',
          '--button-text-color': '#FFFFFF',
          zIndex: 9999,
          position: 'fixed',
          top: y,
          left: x,
          opacity: opacity,
          cursor: 'grab',
        }}
        onMouseEnter={resetHideTimer} // Reset the timer on mouse enter
        onMouseLeave={resetHideTimer} // Reset the timer on mouse leave
      >
        <button
          className={`floating-button ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          data-tip
          data-for="floating-button-tooltip"
        >
          Options
          <BsChevronDown className="ml-1" />
        </button>
        {isOpen && (
          <div
            className="floating-button-menu"
            ref={menuRef}
            style={{
              position: 'fixed',
              top: menuPosition.y,
              left: menuPosition.x,
              background: '#FFFFFF',
              border: '1px solid #CED4DA',
              borderRadius: '50%',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button className="floating-button-menu-item" style={{ background: 'red', borderRadius: '50%' }}>
              Option 1
            </button>
            <button className="floating-button-menu-item" style={{ background: 'blue', borderRadius: '50%' }}>
              Option 2
            </button>
            <button className="floating-button-menu-item" style={{ background: 'green', borderRadius: '50%' }}>
              Option 3
            </button>
          </div>
        )}
      </animated.div>
    </Draggable>
  );
};

export default FloatingButton;
