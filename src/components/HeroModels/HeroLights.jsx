import * as THREE from 'three';

const HeroLights = () => {
  return (
    <>
    <spotLight
        position={[15, 4, 8]}
        angle={0.3}
        intensity={100}
        penumbra={0.5}
        color="white"
    />
    <spotLight
        position={[17, 5, 4]}
        angle={0.3}
        intensity={40}
        penumbra={0.5}
        color="#4cc9f0"
    />

    <spotLight
        position={[-3, 5, 5]}
        angle={0.4}
        intensity={40}
        penumbra={1}
        color="#9d4edd"
    />

    <spotLight
        position={[6, 0, -8]}
        angle={0.5}
        intensity={50}
        penumbra={0.5}
        color="#f72585"
    />

    <pointLight
        position={[5, 0, -6]}
        intensity={50}
        color="#f72585"
    />
    <pointLight
        position={[0, 0, 0]}
        intensity={20}
        color="#0da0a4"
    />
    <primitive object={new THREE.RectAreaLight('#A259FF', 8, 3, 2)} 
    position={[1, 3, 4]}
    intensity={15}
    rotation={[-Math.PI / 4, Math.PI / 4, 0]}
    width={2}
    />
    </>
  )
}

export default HeroLights