import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { LinearSRGBColorSpace } from "three";

export default function Ground() {
    const [floor, normal] = useTexture([
        '/textures/SurfaceImperfections003_1K_var1.jpg',
        '/textures/SurfaceImperfections003_1K_Normal.jpg'
    ]);

    floor.colorSpace = LinearSRGBColorSpace;
    normal.colorSpace = LinearSRGBColorSpace;
    
    return (
        <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            <planeGeometry position={[0, 0, 0]} args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[600, 100]}
                resolution={1024}
                args={[50, 50]}
                mirror={1}
                metalness={0.9}
                normalScale={[1, 1]}
                mixBlur={6}
                roughnessMap={floor}
                mixStrength={2.0}
                mixContrast={1}
                depthScale={0.2}
                minDepthThreshold={0.2}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                distortion={1}
                normalMap={normal}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    );
}
