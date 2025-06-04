import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Room } from './Room';
import { Laptop } from './Laptop';
import HeroLights from './HeroLights';

const RotatingGroup = ({ children, scale, position, rotation }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Slowly rotate on Y axis
    groupRef.current.rotation.y -= delta * 0.2;
  });

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation}>
      {children}
    </group>
  );
};

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <OrbitControls 
        enablePan={false} 
        enableZoom={!isTablet}   
        maxDistance={20} 
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
    />
    <HeroLights />
    <RotatingGroup 
        scale={isMobile ? 0.05 : 0.1} 
        position={[0, -1, 0]} 
        rotation={[0, Math.PI / 4, 0]}
      >
        <Laptop />
      </RotatingGroup>
    </Canvas>
  )
}

export default HeroExperience