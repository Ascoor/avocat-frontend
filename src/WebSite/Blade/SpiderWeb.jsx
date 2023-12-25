import React, { useRef, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

extend({ Line });

const SpiderWeb = () => {
  const { size } = useThree();
  const gridRef = useRef();

  // Calculate points for the web lines
  const points = useMemo(() => {
    const pts = [];
    const divisions = 10; // Number of divisions in the web
    const radius = size.width / 4; // Radius of the web

    for (let i = 0; i < divisions; i++) {
      const angle = (i / divisions) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      pts.push(new THREE.Vector3(0, 0, 0)); // Center point
    }

    return pts;
  }, [size]);

  useFrame(() => {
    // Add some animation if desired
    gridRef.current.rotation.z += 0.001;
  });

  return (
    <group ref={gridRef}>
      {points.map((point, index) => (
        <Line key={index} points={[point, new THREE.Vector3(0, 0, 0)]} color="white" lineWidth={1} />
      ))}
    </group>
  );
};
export default SpiderWeb;