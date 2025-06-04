import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Room } from './Room';
import { Laptop } from './Laptop';
import HeroLights from './HeroLights';

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
    <group
        scale={ isMobile ? 0.05 : 0.1 }
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 4, 0]}
    >
      <Laptop />
    </group>
    </Canvas>
  )
}

export default HeroExperience