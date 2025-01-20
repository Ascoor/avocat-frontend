import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment'; // دعم عرض التاريخ والوقت

// تسجيل المكونات المطلوبة في Chart.js
Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
);

function RealtimeChart({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    // تأكد من أن الكانفاس جاهز
    if (!canvas.current) return;

    // إنشاء المخطط
    const ctx = canvas.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time', // الوقت
            time: {
              unit: 'second',
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
        plugins: {
          tooltip: {
            mode: 'index',
          },
        },
      },
    });

    // تنظيف عند تدمير المكون
    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default RealtimeChart;
