import React, { useState, useEffect, useRef } from 'react';
import TopTools from './TopTools/';
import Sidebar from './SideTools/index';
import EditorTools from './EditorTools/index';

const WordPadEditor = () => {
  const [content, setContent] = useState('');
  const [styles, setStyles] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
  });
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const editorRef = useRef(null);

  // Helper function to set the content and update the history
  const updateContent = (newContent) => {
    setContent(newContent);
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      newHistory.push(newContent);
      return newHistory;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Debounce content updates
  useEffect(() => {
    const timer = setTimeout(() => {
      updateContent(content);
    }, 300);
    return () => clearTimeout(timer);
  }, [content]);

  // Undo/Redo Logic
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setContent(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setContent(history[currentIndex + 1]);
    }
  };

  const handleSaveDocx = () => {
    // Implement logic for saving the content as .docx
  };

  const toggleStyle = (styleKey, activeValue, defaultValue) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [styleKey]: prevStyles[styleKey] === defaultValue ? activeValue : defaultValue,
    }));
  };

  const setStyle = (styleKey, value) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [styleKey]: value,
    }));
  };

  return (
    <div className="App">
      <TopTools
        styles={styles}
        toggleStyle={toggleStyle}
        setStyle={setStyle}
        handleSaveDocx={handleSaveDocx}
        undo={undo}
        redo={redo}
      />
      <Sidebar setStyle={setStyle} />
          <EditorTools/>
      <div className="workspace">
        <div
          ref={editorRef}
          className="editor"
          style={styles}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.textContent)}
        >
          {content}

        </div>
      </div>
    </div>
  );
};

export default WordPadEditor;
