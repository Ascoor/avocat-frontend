import React from 'react';
import './styles.css';

const TopTools = ({ styles, toggleStyle, setStyle, handleSaveDocx, undo, redo }) => {
  return (
    <div className="toolbar">
      <button onClick={() => toggleStyle('fontWeight', 'bold', 'normal')}>Bold</button>
      <button onClick={() => toggleStyle('fontStyle', 'italic', 'normal')}>Italic</button>
      <button onClick={() => toggleStyle('textDecoration', 'underline', 'none')}>Underline</button>
      <button onClick={() => setStyle('textAlign', 'left')}>Align Left</button>
      <button onClick={() => setStyle('textAlign', 'center')}>Center</button>
      <button onClick={() => setStyle('textAlign', 'right')}>Align Right</button>
      <button onClick={() => setStyle('color', 'red')}>Red</button>
      <button onClick={() => setStyle('color', 'green')}>Green</button>
      <button onClick={() => setStyle('color', 'blue')}>Blue</button>
      <select onChange={(e) => setStyle('fontFamily', e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
      <select onChange={(e) => setStyle('fontSize', `${e.target.value}px`)}>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>
      <button onClick={handleSaveDocx}>Save as .docx</button>
      
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default TopTools;
