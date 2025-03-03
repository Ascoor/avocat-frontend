import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useThemeProvider } from '../../../utils/ThemeContext';
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
);

function BarChart01({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';

  // ✅ تعريف الألوان الديناميكية بناءً على `darkMode`
  const colors = useMemo(
    () => ({
      textColor: darkMode ? '#E5E7EB' : '#374151',
      gridColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      tooltipBodyColor: darkMode ? '#E5E7EB' : '#374151',
      tooltipBgColor: darkMode ? '#1F2937' : '#fff',
      tooltipBorderColor: darkMode ? '#4B5563' : '#D1D5DB',
      barBackground: darkMode ? '#A78BFA' : '#F97316',
      barBorder: darkMode ? '#7C3AED' : '#EA580C',
    }),
    [darkMode],
  );

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');

    if (chart) {
      chart.destroy(); // 🔥 تدمير المخطط السابق لتجنب الأخطاء
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          backgroundColor: colors.barBackground,
          borderColor: colors.barBorder,
          borderWidth: 1,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: colors.textColor },
            grid: { color: colors.gridColor },
          },
          x: {
            ticks: { color: colors.textColor },
            grid: { display: false },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: colors.tooltipBgColor,
            bodyColor: colors.tooltipBodyColor,
            borderColor: colors.tooltipBorderColor,
            borderWidth: 1,
          },
          legend: {
            display: true,
            labels: { color: colors.textColor },
          },
        },
      },
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, [data, colors]); // 🔥 تحديث فقط عند تغيير البيانات أو الألوان

  return (
    <div className="w-full h-full">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default BarChart01;
