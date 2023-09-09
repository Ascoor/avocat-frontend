
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import mammoth from 'mammoth';
import '../../../assets/css/WordPadEditor.css';

const WordPadEditor = () => {
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [pageSize, setPageSize] = useState('A4');
  const [alignment, setAlignment] = useState('left');
  const [textDirection, setTextDirection] = useState('rtl');
  const [textColor, setTextColor] = useState('#000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [fontFamily, setFontFamily] = useState('Amiri');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);

  const toggleBold = () => setBold(!bold);
  const toggleItalic = () => setItalic(!italic);
  const toggleUnderline = () => setUnderline(!underline);
  const toggleStrike = () => setStrike(!strike);

  const handleTextDirectionChange = (e) => {
    setTextDirection(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontSizeChange = (value) => {
    if (value === 'Custom') {
      const customSize = prompt('Enter custom font size (e.g., 18px):');
      if (customSize !== null) {
        setFontSize(customSize);
      }
    } else {
      setFontSize(value);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const handleAlignmentChange = (e) => {
    setAlignment(e.target.value);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color.hex);
  };

  const handleLineHeightChange = (e) => {
    setLineHeight(e.target.value);
  };

  const createDocx = () => {
    const options = {
      styleMap: [
        'p[style-name=\'Heading 1\'] => h1:fresh',
        'p[style-name=\'Heading 2\'] => h2:fresh',
      ],
    };

    mammoth
      .convertToHtml(content, options)
      .then((result) => {
        const htmlContent = result.value;

        const blob = new Blob([htmlContent], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'arabic_document.docx';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error converting to DOCX:', error);
      });
  };

  const formats = ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'align', 'line-height'];

  return (
    <div className="wordpad-editor">
      <div className="wordpad-toolbar">
        <div className="toolbar">
          {/* Font Family Selection */}
          <select id="fontSelect" value={fontFamily} onChange={handleFontFamilyChange}>
            <option value="Amiri">Amiri</option>
            <option value="Arial">Arial</option>
            {/* Add more Arabic font options here */}
          </select>

          {/* Font Size Selection */}
          <select id="fontSizeSelect" value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)}>
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="Custom">Custom</option>
          </select>

          {/* Input for Custom Font Size */}
          {fontSize === 'Custom' && (
            <input
              type="text"
              placeholder="Enter custom font size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          )}

          {/* Page Size Selection */}
          <select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange}>
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
            {/* Add more page size options here */}
          </select>

          {/* Alignment Selection */}
          <select id="alignmentSelect" value={alignment} onChange={handleAlignmentChange}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          {/* Text Direction Selection */}
          <select id="textDirectionSelect" value={textDirection} onChange={handleTextDirectionChange}>
            <option value="rtl">RTL (Right-to-Left)</option>
            <option value="ltr">LTR (Left-to-Right)</option>
          </select>

          {/* Text Color Selection */}
          <input type="color" id="textColor" value={textColor} onChange={(e) => handleTextColorChange(e.target.value)} />

          {/* Background Color Selection */}
          <input type="color" id="bgColor" value={bgColor} onChange={(e) => handleBgColorChange(e.target.value)} />

          {/* Line Height Input */}
          <input type="number" id="lineHeight" value={lineHeight} onChange={handleLineHeightChange} />

          {/* Toggle Formatting Options */}
          <button onClick={toggleBold}>Bold</button>
          <button onClick={toggleItalic}>Italic</button>
          <button onClick={toggleUnderline}>Underline</button>
          <button onClick={toggleStrike}>Strike</button>

          {/* Export Button */}
          <button onClick={createDocx}>Export Arabic DOCX</button>
        </div>
      </div>

      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        formats={formats}
        modules={{
          toolbar: {
            container: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ align: [] }],
              ['bold', 'italic', 'underline', 'strike', 'color', 'background'],
              ['link', 'image'],
              ['clean'],
            ],
          },
        }}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          width: pageSize.width,
          height: pageSize.height,
          direction: textDirection,
          textAlign: alignment,
          color: textColor,
          backgroundColor: bgColor,
          lineHeight: lineHeight,
        }}
      />
    </div>
  );
};

export default WordPadEditor;