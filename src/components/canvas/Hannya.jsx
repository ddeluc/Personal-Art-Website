import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { OrbitControls, Preload, useGLTF, PresentationControls, Environment } from "@react-three/drei";
import * as THREE from 'three';

import { styles } from "../../styles";

import CanvasLoader from "../Loader";

const HannyaCanvas = () => {
  const backgroundColor = new THREE.Color('#000000');

  return (
    <Canvas shadows camera={{ position: [0, 0, 55], fov: 30 }}>
      {/* <color attach="background" args={[backgroundColor]} /> */}
      <Suspense fallback={<CanvasLoader />}>        
        <Hannya />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
};

const Hannya = () => {
  const hannya = useGLTF("./hannya_full_size/scene.gltf");
  const meshRef = useRef();
  const groupRef = useRef();
  const topLightRef = useRef();
  const leftSidetLightRef = useRef();
  const rightSideLightRef = useRef();

  const cameraVector = new THREE.Vector3();
  let lerpPosX = 0;
  let lerpPosZ = -7;
  let lerpRotY = 0;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = -Math.cos(t / 2) / 6 + Math.PI/10;
    meshRef.current.rotation.y = -Math.sin(t / 2) / 8;

    cameraVector.set(state.mouse.x * -5, state.mouse.y * -5, state.camera.position.z)
    state.camera.position.lerp(cameraVector, 0.025)
    state.camera.lookAt(0, 0, 0)

    if (state.mouse.x > 0.30) {
      lerpPosX = -8;
      lerpPosZ = 10;
      lerpRotY = Math.PI/4
    } else if (state.mouse.x < 0.30 && state.mouse.x > -0.30) {
      lerpPosX = 0;
      lerpPosZ = -7;
      lerpRotY = 0;
    } else {
      lerpPosX = 8;
      lerpPosZ = 10;
      lerpRotY = -Math.PI/4
    }

    // groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, lerpPosX, 0.025);
    // groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, lerpPosZ, 0.025);
    // groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, lerpRotY, 0.025)    

    const lightx = topLightRef.current.position.x + state.mouse.x * 1.25;
    const leftLighty = leftSidetLightRef.current.position.y + state.mouse.y * 0.5;
    const rightLighty = rightSideLightRef.current.position.y + state.mouse.y * 0.5;

    topLightRef.current.position.x = THREE.MathUtils.clamp(lightx, -60, 60);
    leftSidetLightRef.current.position.y = THREE.MathUtils.clamp(leftLighty, -40, 0);
    rightSideLightRef.current.position.y = THREE.MathUtils.clamp(rightLighty, -40, 0);
  })

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef}
        scale={0.12}
        rotation={[0, 0, 0]}
        position={[0, -2, -7]}>
        <primitive
          object={hannya.scene}          
        />
        <spotLight ref={topLightRef} position={[0, 100, 25]} intensity={2} />
        <spotLight ref={leftSidetLightRef} position={[20, -20, 4]} angle={0.15} intensity={0.5} />
        <spotLight ref={rightSideLightRef} position={[-20, -20, 4]} angle={0.15} intensity={0.5} />
      </mesh>
    </group>    
  )
};

export default HannyaCanvas;
