// ckeditorConfig.js
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'fontColor',
      'fontSize',
      'fontFamily',
      'underline',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'indent',
      'outdent',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
    fontFamily: {
      options: [
        'default',
        'Arial, sans-serif',
        'Times New Roman, serif',
        'Tajawal, Arial, sans-serif', // اسم الخط العربي
        // يمكنك إضافة المزيد من الخطوط العربية هنا
      ],
    },
  },

  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  },

  language: 'ar',
  direction: 'rtl',
};

export default ClassicEditor;
