import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'; // Use DecoupledEditor for document-based editing

function Editor({ importedDocContent }) {
  // State to store the editor content
  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');

  // Handler for when the editor is ready
  const handleEditorReady = (editor) => {
    // You can store the "editor" and use it when needed.
    console.log('Editor is ready to use!', editor);
  };

  // Handler for when the editor content changes
  const handleEditorChange = (event, editor) => {
    // Update the editor data in the state when the content changes
    setEditorData(editor.getData());
    console.log(event);
  };

  // Handler for when the editor loses focus
  const handleEditorBlur = (event, editor) => {
    console.log('Blur.', editor);
  };

  // Handler for when the editor gains focus
  const handleEditorFocus = (event, editor) => {
    console.log('Focus.', editor);
  };

  return (
    <div className="editor-container">
      <h2>Using CKEditor 5 built in React</h2>
      <CKEditor
        editor={DecoupledEditor}
        data={editorData}
        config={{
          language: 'ar', // Set the language to 'ar' for Arabic or 'he' for Hebrew
          // Add any other configuration options as needed
        }}
        onReady={handleEditorReady}
        onChange={handleEditorChange}
        onBlur={handleEditorBlur}
        onFocus={handleEditorFocus}
      />
    </div>
  );
}

export default Editor;
