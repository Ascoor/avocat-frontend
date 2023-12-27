import React, { useRef, useMemo, useEffect } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import anime from 'animejs'; // استيراد مكتبة anime

extend({ Line });

const SpiderWeb = () => {
  const { size } = useThree();
  const gridRef = useRef();

  // Calculate points for the web lines
  const points = useMemo(() => {
    const pts = [];
    const divisions = 30; // Number of divisions in the web
    const radius = size.width / 12; // Radius of the web

    for (let i = 0; i < divisions; i++) {
      const angle = (i / divisions) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      pts.push(new THREE.Vector3(0, 0, 0)); // Center point
    }

    return pts;
  }, [size]);



  useEffect(() => {
    // تأثير ظهور ببطء
    anime({
      targets: gridRef.current.position,
      y: 0.1, // الارتفاع الأولي
      duration: 2000, // مدة الظهور بالمللي ثانية
      easing: 'easeInOutQuad', // تأثير التحول
      direction: 'alternate', // الاتجاه البديل
      loop: true, // تكرار الحركة
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + 0.05 * Math.sin(t * 0.5); // Pulsation effect
    gridRef.current.scale.set(scale, scale, scale);
  
    // تحريك الشبكة هنا بناءً على t
    gridRef.current.rotation.z += 0.001;
    gridRef.current.position.y = amplitude * Math.sin(frequency * t);
  });

  return (
    <group ref={gridRef}>
      {points.map((point, index) => (
        <Line key={index} points={[point, new THREE.Vector3(0, 0, 0)]} opacity={0.1} color="silver" lineWidth={1} />
      ))}
      <spotLight position={[0, 0, 10]} intensity={0.1} castShadow={true} decay={2} />
    </group>
  );
};

export default SpiderWeb;