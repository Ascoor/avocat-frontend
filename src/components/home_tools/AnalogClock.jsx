import { useState, useEffect } from 'react';

const AnalogClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  const radius = 50;
  const center = radius;
  const hour = (date.getHours() % 12) * 30 + date.getMinutes() * 0.5;
  const minute = date.getMinutes() * 6;
  const second = date.getSeconds() * 6;

  // Calculate the positions of hour markers
  const markers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = center + (radius - 10) * Math.cos(angle);
    const y = center + (radius - 10) * Math.sin(angle);
    markers.push({ x, y, text: i.toString() });
  }

  return (
    <svg width={2 * radius} height={2 * radius}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="lightgray"
        stroke="black"
        strokeWidth="2"
      />

      {/* Hour Markers */}
      {markers.map((marker, index) => (
        <text
          key={index}
          x={marker.x}
          y={marker.y + 5} // Adjust text vertical position
          textAnchor="middle"
          fill="black"
          fontSize="12"
        >
          {marker.text}
        </text>
      ))}

      {/* Hour Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + radius * 0.5 * Math.cos((Math.PI * (hour - 90)) / 180)}
        y2={center + radius * 0.5 * Math.sin((Math.PI * (hour - 90)) / 180)}
        stroke="black"
        strokeWidth="4"
      />

      {/* Minute Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + radius * 0.7 * Math.cos((Math.PI * (minute - 90)) / 180)}
        y2={center + radius * 0.7 * Math.sin((Math.PI * (minute - 90)) / 180)}
        stroke="blue"
        strokeWidth="2"
      />

      {/* Second Hand */}
      <line
        x1={center}
        y1={center}
        x2={center + radius * 0.9 * Math.cos((Math.PI * (second - 90)) / 180)}
        y2={center + radius * 0.9 * Math.sin((Math.PI * (second - 90)) / 180)}
        stroke="red"
        strokeWidth="1"
      />
    </svg>
  );
};

export default AnalogClock;
