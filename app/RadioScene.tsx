"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
    OrbitControls,
    useGLTF,
    Environment,
    Center,
} from "@react-three/drei"

function WatchModel({
    rotation,
    position,
    scale,
}: {
    rotation: [number, number, number]
    position: [number, number, number]
    scale: number
}) {
    const { scene } = useGLTF("/models/watch.glb")

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Center>
                <primitive object={scene} />
            </Center>
        </group>
    )
}

export default function RadioScene() {
    const [preset, setPreset] = useState<number>(0)

    // With X rotation = Math.PI / 2 (+1.57 rad), the dial (+Y) rotates to point directly at the camera (+Z)!
    const presets: Array<{
        name: string
        pos: [number, number, number]
        rot: [number, number, number]
        scale: number
    }> = [
        {
            name: "01 Hero Dial 3/4",
            pos: [0.35, 0, 0],
            rot: [1.35, -0.4, 0.2],
            scale: 1.0,
        },
        {
            name: "02 Dial Direct Frontal",
            pos: [0, 0, 0.4],
            rot: [1.57, 0, 0],
            scale: 1.35,
        },
        {
            name: "03 Silhouette Profile",
            pos: [1.1, 0, 0.2],
            rot: [1.57, -1.55, 0],
            scale: 1.1,
        },
        {
            name: "04 Vertical Dial Frontal",
            pos: [0, 0, 0.4],
            rot: [1.57, 0, 1.57],
            scale: 1.35,
        },
        {
            name: "05 Vertical Hero 3/4",
            pos: [0.4, 0, 0.1],
            rot: [1.35, 0.35, 1.4],
            scale: 1.05,
        },
    ]

    const current = presets[preset]

    return (
        <div style={{ width: "100%", height: "100vh", background: "#090A0C", position: "relative" }}>
            <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10, display: "flex", gap: 8 }}>
                {presets.map((p, idx) => (
                    <button
                        key={idx}
                        id={`btn-preset-${idx}`}
                        onClick={() => setPreset(idx)}
                        style={{
                            padding: "8px 16px",
                            background: preset === idx ? "#B6A078" : "#17191D",
                            color: preset === idx ? "#090A0C" : "#F1EFE9",
                            border: "1px solid #333",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 42,
                }}
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 8, 5]} intensity={2.5} />
                <directionalLight position={[-5, 3, -3]} intensity={1.3} />
                <directionalLight position={[0, -4, 4]} intensity={0.9} />

                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <WatchModel
                        position={current.pos}
                        rotation={current.rot}
                        scale={current.scale}
                    />
                </Suspense>

                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}