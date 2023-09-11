import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import './styles.css'; // your custom styles

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ 'align': [] }],
    ['clean']                                         
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align'
];

const EditorTools = ({ content, setContent }) => {
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className="editor-area">
      <ReactQuill 
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default EditorTools;
