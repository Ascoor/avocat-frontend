import React from 'react';

const DeleteConfirmationModal = ({ onDelete, onCancel }) => (
  <div className='fixed inset-0 bg-opacity-50 z-50 bg-black flex justify-center items-center'>
    <div className='bg-gray-200 dark:bg-gray-900 p-4 rounded-lg shadow-lg text-center'>
      <h2 className='font-semibold text-lg mb-4'>تأكيد الحذف</h2>
      <p>هل أنت متأكد أنك تريد الحذف؟</p>
      <div className='flex justify-around mt-4'>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
          onClick={onDelete}
        >
          حذف
        </button>
        <button
          className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
          onClick={onCancel}
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
