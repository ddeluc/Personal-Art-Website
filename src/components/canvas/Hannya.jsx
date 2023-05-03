import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, PresentationControls, Environment } from "@react-three/drei";
import * as THREE from 'three';

import { styles } from "../../styles";

import CanvasLoader from "../Loader";

const HannyaCanvas = () => {
  const backgroundColor = new THREE.Color('#000000');

  return (
    <Canvas shadows camera={{ position: [0, 40, 50], fov: 30 }}>
      <axesHelper />
      <color attach="background" args={[backgroundColor]} />
      <Suspense fallback={<CanvasLoader />}>        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
        <Hannya />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
};

const Hannya = () => {
  const hannya = useGLTF("./hannya_full_size/scene.gltf");
  const meshRef = useRef();
  const topLightRef = useRef();
  const leftSidetLightRef = useRef();
  const rightSideLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 4;
    meshRef.current.rotation.y = Math.sin(t / 2) / 8;

    const lightx = topLightRef.current.position.x + state.mouse.x * 1.25;
    const leftLighty = leftSidetLightRef.current.position.y + state.mouse.y * 0.5;
    const rightLighty = rightSideLightRef.current.position.y + state.mouse.y * 0.5;

    topLightRef.current.position.x = THREE.MathUtils.clamp(lightx, -60, 60);
    leftSidetLightRef.current.position.y = THREE.MathUtils.clamp(leftLighty, -40, 0);
    rightSideLightRef.current.position.y = THREE.MathUtils.clamp(rightLighty, -40, 0);
  })

  return (
    <mesh ref={meshRef}>
      <primitive
        object={hannya.scene}
        scale={0.12}
        rotation={[0.3, 0, 0]}
        position={[0, -1.7, 6]}
      />
      <axesHelper />
      <spotLight ref={topLightRef} position={[0, 20, 10]} intensity={2} />
      <spotLight ref={leftSidetLightRef} position={[20, -20, 4]} angle={0.15} intensity={0.5} />
      <spotLight ref={rightSideLightRef} position={[-20, -20, 4]} angle={0.15} intensity={0.5} />
    </mesh>
  )
};

export default HannyaCanvas;

// rotation={[0.3, 0, 0]}
// position={[0, -1.7, 6]}