"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { WatchTransform } from "@/types/story";

interface WatchCanvasProps {
  transformRef: React.MutableRefObject<WatchTransform>;
  isInteractive: boolean;
  onModelLoaded?: () => void;
}

function WatchModel({
  transformRef,
  isInteractive,
  onLoaded,
}: {
  transformRef: React.MutableRefObject<WatchTransform>;
  isInteractive: boolean;
  onLoaded?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/watch.glb");

  React.useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isInteractive) {
      const t = transformRef.current;
      const time = state.clock.getElapsedTime();
      const floatY = Math.sin(time * 0.8) * 0.012;
      const floatRz = Math.cos(time * 0.6) * 0.004;

      const g = groupRef.current;
      // Damping factor for silky smooth motion
      const smoothFactor = 5.5;

      g.position.x = THREE.MathUtils.damp(g.position.x, t.posX, smoothFactor, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, t.posY + floatY, smoothFactor, delta);
      g.position.z = THREE.MathUtils.damp(g.position.z, t.posZ, smoothFactor, delta);

      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, t.rotX, smoothFactor, delta);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t.rotY, smoothFactor, delta);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, t.rotZ + floatRz, smoothFactor, delta);

      const newScale = THREE.MathUtils.damp(g.scale.x, t.scale, smoothFactor, delta);
      g.scale.setScalar(newScale);
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload watch model
useGLTF.preload("/models/watch.glb");

function SceneLighting({
  transformRef,
}: {
  transformRef: React.MutableRefObject<WatchTransform>;
}) {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const intensity = transformRef.current?.lightIntensity || 2.4;
    if (keyLightRef.current) keyLightRef.current.intensity = intensity;
    if (fillLightRef.current) fillLightRef.current.intensity = intensity * 0.55;
    if (ambientRef.current) ambientRef.current.intensity = intensity * 0.32;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.7} />
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 5]}
        intensity={2.4}
      />
      <directionalLight
        ref={fillLightRef}
        position={[-5, 3, -3]}
        intensity={1.3}
      />
      <directionalLight position={[0, -4, 4]} intensity={0.8} />
    </>
  );
}

function WatchLoadingFallback() {
  return null;
}

export default function WatchCanvas({
  transformRef,
  isInteractive,
  onModelLoaded,
}: WatchCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <div
        className={`w-full h-full ${
          isInteractive ? "pointer-events-auto cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <Canvas
          camera={{
            position: [0, 0, 6.2],
            fov: 38,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <SceneLighting transformRef={transformRef} />

          <Suspense fallback={<WatchLoadingFallback />}>
            <Environment preset="studio" />
            <WatchModel
              transformRef={transformRef}
              isInteractive={isInteractive}
              onLoaded={onModelLoaded}
            />
          </Suspense>

          {isInteractive && (
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={2.5}
              maxDistance={7.5}
              rotateSpeed={0.8}
            />
          )}
        </Canvas>
      </div>
    </div>
  );
}
