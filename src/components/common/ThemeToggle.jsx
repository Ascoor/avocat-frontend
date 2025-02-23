import { useThemeProvider } from '../../utils/ThemeContext';

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <button
      onClick={() =>
        changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      className="p-2 bg-blue-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-avocat-indigo transition"
    >
      {currentTheme === 'light' ? '🌞' : '🌙'}
    </button>
  );
}
