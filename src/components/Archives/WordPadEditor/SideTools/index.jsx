import React from 'react';
import './styles.css';

const Sidebar = ({ setStyle }) => {
  return (
    <div className="sidebar">
      <button onClick={() => setStyle('textAlign', 'left')}>Align Left</button>
      <button onClick={() => setStyle('textAlign', 'center')}>Center</button>
      <button onClick={() => setStyle('textAlign', 'right')}>Align Right</button>
      <button onClick={() => setStyle('color', 'red')}>Red</button>
      <button onClick={() => setStyle('color', 'green')}>Green</button>
      <button onClick={() => setStyle('color', 'blue')}>Blue</button>
    </div>
  );
};

export default Sidebar;
