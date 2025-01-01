import purify from 'purify-css';
import fs from 'fs';

// تحديد الملفات المصدر وملفات CSS
const contentFiles = ['./src/**/*.jsx', './public/**/*.html']; // مسارات ملفات HTML و JS
const cssFiles = ['./src/App.css']; // ملف CSS الخاص بك

// تحديد مسار الإخراج
const outputFile = './src/styles.purified.css';

// خيارات Purify CSS
const options = {
  output: outputFile,
  minify: true, // لضغط CSS الناتج
};

purify(contentFiles, cssFiles, options, (purifiedCss) => {
  console.log(`Purified CSS has been saved to ${outputFile}`);
});
