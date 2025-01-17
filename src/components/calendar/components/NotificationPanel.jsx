import { FaRegTrashAlt } from 'react-icons/fa';

const NotificationPanel = ({ notifications = [], removeNotification }) => {
  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
      <h4 className="font-bold text-avocat-blue dark:text-avocat-orange mb-2">الإشعارات</h4>

      {/* التحقق من وجود إشعارات */}
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <div key={note.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-md mb-2">
            <span>{note.message}</span>
            <button onClick={() => removeNotification(note.id)}>
              <FaRegTrashAlt className="text-red-500" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">لا توجد إشعارات حالياً</p>
      )}
    </div>
  );
};

export default NotificationPanel;
