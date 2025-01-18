const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
}) => {
  if (!isOpen) return null; // Prevents the modal from rendering if not open

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div
        className='fixed inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      ></div>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full'>
          <h2 className='text-lg font-semibold mb-4'>{title}</h2>
          <p className='mb-4'>{message}</p>
          <div className='flex justify-end'>
            <button
              onClick={onClose}
              className='bg-gray-300 text-gray-900 rounded hover:bg-gray-400 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='bg-red-500 text-white rounded hover:bg-red-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
