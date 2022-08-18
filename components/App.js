import * as THREE from 'three';
import React, { Suspense, useEffect, useCallback, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Reflector, Text, useTexture, useGLTF, OrbitControls } from '@react-three/drei';
import Overlay from './Overlay';
import gsap from 'gsap';
import Couch from './Couch';

function VideoText({ clicked, text, offset, ...props }) {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: '/videos/matrix_compressed.mp4',
      crossOrigin: 'Anonymous',
      loop: true
    })
  );
  useEffect(() => {
    if (clicked) {
      video.playsInline = true;
      video.currentTime = offset || 0;
      video.play();
    }
  }, [video, clicked]);
  return (
    <Text font="/fonts/ShareTechMono.ttf" fontSize={2} letterSpacing={-0.1} {...props}>
      {text}
      <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  );
}

function Ground({ start }) {
  const [floor, normal] = useTexture([
    '/textures/SurfaceImperfections003_1K_var1.jpg',
    '/textures/SurfaceImperfections003_1K_Normal.jpg'
  ]);

  const { camera } = useThree();

  useEffect(() => {
    if (start) {
      gsap.to(camera.position, { z: 15, duration: 2, ease: 'power3.inOut' });
    }
  }, [start]);

  return (
    <Reflector
      blur={[400, 100]}
      resolution={1024}
      args={[30, 30]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={2.0}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[1, 1]}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const store = { clicked, setClicked, ready, setReady };
  const overlay = useRef();

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        {/* <fog attach="fog" args={['black', 15, 50]} /> */}
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Couch rotation={[0, Math.PI + 0.4, 0]} position={[1.2, 0, 0.6]} scale={[1, 1, 1]} />
            <VideoText {...store} position={[0, 0.65, -2]} text={'01001110'} />
            <VideoText {...store} position={[0, 2.06, -2]} offset={2} text={'01000101'} />
            <VideoText {...store} position={[0, 3.47, -2]} offset={1} text={'01001111'} />
            <Ground start={ready && clicked} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          <Intro start={ready && clicked} set={setReady} />
          <OrbitControls makeDefault minDistance={0.1} maxDistance={23} maxPolarAngle={Math.PI / 2} />
        </Suspense>
      </Canvas>
      <Overlay {...store} ref={overlay} />
    </>
  );
}

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3());
  useEffect(() => {
    setTimeout(() => set(true), 500);
  }, []);
  return useFrame((state) => {
    // if (start) {
    // state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    //   state.camera.lookAt(0, 0, 0)
    // }
  });
}

useGLTF.preload('/models/couch.glb');
