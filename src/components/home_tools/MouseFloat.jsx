import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useSpring, animated } from "@react-spring/web";
import { usePopper } from "react-popper";
import { Popover } from "react-bootstrap";

const MouseFloat = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseClick = () => {
    setShowDropdown(!showDropdown);
  };

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-end", // Adjust the placement as needed
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8], // Adjust the offset as needed
        },
      },
    ],
  });

  const dropdownProps = useSpring({
    opacity: showDropdown ? 1 : 0,
    display: showDropdown ? "block" : "none",
  });

  return (
    <>
      {/* Floating button */}
      <div
        className="mouse-float-button"
        ref={setReferenceElement}
        onClick={handleMouseClick}
      >
        <BiMenu size={24} />
      </div>

      {/* Dropdown menu */}
      <animated.div
        className="mouse-float-dropdown"
        ref={setPopperElement}
        style={{ ...styles.popper, ...dropdownProps }}
        {...attributes.popper}
      >
        <Popover>
          <Popover.Content>
            <div className="dropdown-menu-items">
              <div>Menu Item 1</div>
              <div>Menu Item 2</div>
              <div>Menu Item 3</div>
            </div>
          </Popover.Content>
        </Popover>
      </animated.div>
    </>
  );
};

export default MouseFloat;
