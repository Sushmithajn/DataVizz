import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useData } from '../../contexts/DataContext';

function Column({ position, height, color }: { position: [number, number, number], height: number, color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Chart3DScene() {
  const { currentFile, chartConfig } = useData();

  const chartData = useMemo(() => {
    if (!currentFile) return [];

    const xAxisIndex = currentFile.headers.indexOf(chartConfig.xAxis);
    const yAxisIndex = currentFile.headers.indexOf(chartConfig.yAxis);

    if (xAxisIndex === -1 || yAxisIndex === -1) return [];

    const data = currentFile.data
      .slice(0, 20) // Limit to 20 items for performance
      .map((row, index) => ({
        x: index * 2,
        y: Number(row[yAxisIndex]) || 0,
        z: 0,
        label: row[xAxisIndex]?.toString() || `Item ${index + 1}`,
        value: Number(row[yAxisIndex]) || 0
      }))
      .filter(item => !isNaN(item.value));

    // Scale heights
    const maxValue = Math.max(...data.map(d => d.value));
    return data.map(item => ({
      ...item,
      y: (item.value / maxValue) * 8 // Scale to max height of 8
    }));
  }, [currentFile, chartConfig]);

  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {chartData.map((item, index) => (
        <group key={index}>
          <Column
            position={[item.x, item.y / 2, item.z]}
            height={item.y}
            color={colors[index % colors.length]}
          />
          <Text
            position={[item.x, -1, item.z]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
          >
            {item.label.length > 8 ? item.label.substring(0, 8) + '...' : item.label}
          </Text>
          <Text
            position={[item.x, item.y + 0.5, item.z]}
            fontSize={0.4}
            color="white"
            anchorX="center"
          >
            {item.value.toFixed(1)}
          </Text>
        </group>
      ))}
      
      {/* Axes */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, Math.max(chartData.length * 2, 10)]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
}

export default function Chart3D() {
  const { chartConfig } = useData();

  return (
    <div className="h-96 relative">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white font-semibold text-lg">{chartConfig.title || '3D Column Chart'}</h3>
        <p className="text-white/70 text-sm">Click and drag to rotate • Scroll to zoom</p>
      </div>
      
      <Canvas camera={{ position: [15, 10, 15], fov: 60 }}>
        <Chart3DScene />
      </Canvas>
    </div>
  );
}