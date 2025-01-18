import { parsePhoneNumberFromString } from 'libphonenumber-js';

const validatePhoneNumber = phone => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return 'رقم الهاتف غير صالح.';
  }
  return '';
};

const validateImage = file => {
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSizeInBytes = 1024 * 1024; // 1024 KB

  if (!validImageTypes.includes(file.type)) {
    return 'نوع الملف غير مدعوم. يرجى تحميل صورة بصيغة jpg, jpeg, png، أو gif.';
  }

  if (file.size > maxSizeInBytes) {
    return 'حجم الصورة يجب أن لا يتجاوز 1024 كيلوبايت.';
  }

  return '';
};

const validateForm = formData => {
  const errors = {};

  if (!formData.name) {
    errors.name = ['الاسم مطلوب.'];
  }

  return errors;
};

export { validateImage, validatePhoneNumber, validateForm };
