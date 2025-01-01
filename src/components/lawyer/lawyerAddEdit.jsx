import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { ar } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const LawyerAddEdit = ({ onSubmit, initialValues }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUser, setIsUser] = useState(!!initialValues?.user_id);
  const [name, setName] = useState(initialValues?.name || '');
  const [birthdate, setBirthdate] = useState(initialValues?.birthdate || null);
  const [identityNumber, setIdentityNumber] = useState(
    initialValues?.identity_number || ''
  );
  const [lawRegNumber, setLawRegNumber] = useState(
    initialValues?.law_reg_num || ''
  );
  const [lawyerClass, setLawyerClass] = useState(
    initialValues?.lawyer_class || ''
  );
  const [email, setEmail] = useState(initialValues?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(
    initialValues?.phone_number || ''
  );
  const [religion, setReligion] = useState(initialValues?.religion || '');
  const [gender, setGender] = useState(initialValues?.gender || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const isValidDate = (date) => date !== null && date.toString() !== 'Invalid Date';

  useEffect(() => {
    setIsEditing(!!initialValues);
    setIsUser(!!initialValues?.user_id);
    if (initialValues?.user_id) {
      setPassword('********');
      setConfirmPassword('********');
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);

    const formattedBirthdate = moment(birthdate).format('YYYY-MM-DD');

    const formData = {
      name,
      birthdate: formattedBirthdate,
      identity_number: identityNumber,
      law_reg_num: lawRegNumber,
      lawyer_class: lawyerClass,
      email,
      phone_number: phoneNumber,
      religion,
      gender,
    };

    if (isUser && password !== '********') {
      formData.password = password;
      if (password !== confirmPassword) {
        return;
      }
    }

    onSubmit(formData);
  };

  const validateForm = () => {
    if (
      !name ||
      !isValidDate(birthdate) ||
      !identityNumber ||
      !lawRegNumber ||
      !email ||
      !phoneNumber ||
      !religion ||
      !gender
    ) {
      return false;
    }
    if (isUser && showPasswordInput && password !== confirmPassword) {
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showAlert && (
        <div className="p-4 text-red-700 bg-red-100 rounded">
          يرجى ملء جميع الحقول المطلوبة.
        </div>
      )}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={isUser}
            onChange={() => setIsUser(true)}
            className="form-radio text-blue-500"
          />
          <span>حساب مستخدم</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={!isUser}
            onChange={() => setIsUser(false)}
            className="form-radio text-blue-500"
          />
          <span>بدون حساب مستخدم</span>
        </label>
      </div>

      {isUser && (
        <>
          <div>
            <label className="block mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <div>
        <label className="block mb-2">الاسم</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-2 flex items-center space-x-2">
          <FaCalendarAlt /> <span>تاريخ الميلاد</span>
        </label>
        <DatePicker
          selected={isValidDate(birthdate) ? birthdate : null}
          onChange={(date) => setBirthdate(date)}
          locale={ar}
          dateFormat="yyyy-MM-dd"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholderText="اختر تاريخ الميلاد"
        />
      </div>

      <div>
        <label className="block mb-2">رقم التسجيل القانوني</label>
        <input
          type="text"
          value={lawRegNumber}
          onChange={(e) => setLawRegNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-2">فئة المحامي</label>
        <select
          value={lawyerClass}
          onChange={(e) => setLawyerClass(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">اختر</option>
          <option value="نقض">نقض</option>
          <option value="إستئناف">إستئناف</option>
          <option value="إبتدائي">إبتدائي</option>
          <option value="جدول عام">جدول عام</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-2">رقم الهاتف</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        حفظ
      </button>
    </form>
  );
};

export default LawyerAddEdit;
