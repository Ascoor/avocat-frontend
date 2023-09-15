import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import JSZip from 'jszip'; // It seems like you imported it but did not use it.
import { saveAs } from 'file-saver';
import mammoth from 'mammoth';
import 'react-quill/dist/quill.snow.css';
import './EditorTools.css';

// Quill configuration
const Align = Quill.import('attributors/style/align');
Quill.register(Align, true);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const EditorTools = ({ content, setContent }) => {
  const [editorContent, setEditorContent] = useState('');

  // Synchronize external content with internal state
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  // Handle editor content change
  const handleChange = (value) => {
    setEditorContent(value);
    setContent(value);
  };

  // Export content as DOCX
  const exportAsDocx = () => {
    mammoth.convertToRaw(editorContent).then((result) => {
      // You'll need to implement the actual DOCX export logic here
    });
  };

  return (
    <div className="editor-area">
      <ReactQuill value={editorContent} onChange={handleChange} modules={modules} />
      <button onClick={exportAsDocx}>Export as DOCX</button>
    </div>
  );
};

export default EditorTools;
