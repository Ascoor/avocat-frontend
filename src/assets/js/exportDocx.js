// exportDocx.js
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
export const exportDocx = (editorData) => {
  // Create a new document with a creator
  const doc = new Document({
    creator: 'Your Name', // Replace 'Your Name' with the actual creator/author name
  });

  // Create a new paragraph with the editor data
  const paragraph = new Paragraph({
    children: [new TextRun(editorData)],
  });

  // Create a section and add the paragraph
  const section = {
    children: [paragraph],
  };

  // Add the section to the document
  doc.addSection(section);

  // Pack and save the document
  Packer.toBlob(doc)
    .then((blob) => {
      saveAs(blob, 'exported-document.docx');
    })
    .catch((err) => console.error(err));
};
