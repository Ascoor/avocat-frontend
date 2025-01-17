
  
  // 📁 CalendarPage.jsx
  
  import CalendarView from './components/CalendarView';
  import NotificationPanel from './components/NotificationPanel';
  import FilterPanel from './components/FilterPanel';
  
  // Main page that integrates all calendar components into a cohesive view
  const CalendarPage = () => {
    return (
      <div className="calendar-page p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        {/* FilterPanel allows users to filter events by category or date */}
        <FilterPanel />
        
        {/* CalendarView displays the main calendar with all events */}
        <CalendarView />
        
        {/* NotificationPanel shows upcoming event notifications */}
        <NotificationPanel />
      </div>
    );
  };
  
  export default CalendarPage;
  