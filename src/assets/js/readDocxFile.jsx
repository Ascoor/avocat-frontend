const mammoth = require('mammoth');
const textract = require('textract');

async function readWordDocument(filePath) {
  if (filePath.endsWith('.docx')) {
    // Read .docx using mammoth
    const { value } = await mammoth.extractRawText({ path: filePath });
    return value;
  } else if (filePath.endsWith('.doc')) {
    // Read .doc using textract
    return new Promise((resolve, reject) => {
      textract.fromFileWithPath(filePath, { preserveLineBreaks: true }, (error, text) => {
        if (error) {
          reject(error);
        } else {
          resolve(text);
        }
      });
    });
  } else {
    throw new Error('Unsupported file format');
  }
}

module.exports = readWordDocument;
