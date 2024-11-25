import { OrbitControls, Reflector, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Howl } from 'howler';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Couch from '../components/Couch';
import Overlay from '../components/Overlay';
import Phone from '../components/Phone';
import main from '../components/sounds/3.mp3';
import secondary from '../components/sounds/mtrx_loop_secondary.mp3';
import VideoText from '../components/VideoText';

const tracks = {
  main: new Howl({
    src: [main],
    format: ['mp3'],
    preload: true,
    loop: true,
    volume: .2,
  }),
  secondary: new Howl({
    src: [secondary],
    format: ['mp3'],
    preload: true,
    loop: true,
    volume: .2,
  }),
}

function Ground({ start }) {
  const [floor, normal] = useTexture([
    '/textures/SurfaceImperfections003_1K_var1.jpg',
    '/textures/SurfaceImperfections003_1K_Normal.jpg'
  ]);

  return (
    <Reflector
      blur={[400, 100]}
      resolution={4048}
      args={[50, 50]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={2.0}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.9}
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
  ;
  const overlay = useRef();

  const [track, setTrack] = useState('main');
  const [light, setLight] = useState(false);
  const [couch, setCouch] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [video, setVideo] = useState(true);
  const [sound, setSound] = useState(false);

  const store = {
    clicked,
    setClicked,
    ready,
    setReady,
    light,
    setLight,
    couch,
    setCouch,
    rotate,
    setRotate,
    video,
    setVideo,
    sound,
    setSound,
  }

  useEffect(() => {
    if (sound) {
      tracks[track].play();
    } else {
      tracks[track].stop();
    }
  }, [sound, track])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Couch couch={couch} rotation={[0, Math.PI + 0.4, 0]} position={[1.2, 0, 0.6]} scale={[1, 1, 1]} />
            <Phone couch={couch} />
            <VideoText video={video}  {...store} position={[0, 0.65, -2]} text={'01001110'} />
            <VideoText video={video} {...store} position={[0, 2.06, -2]} offset={2} text={'01000101'} />
            <VideoText video={video} {...store} position={[0, 3.47, -2]} offset={1} text={'01001111'} />
            <Ground start={ready && clicked} />
          </group>
          {light && <spotLight position={[0, 10, 0]} intensity={5} angle={Math.PI / 9} penumbra={0.5} />}
          {light && <ambientLight intensity={0.5} />}
          <Intro rotate={rotate} start={ready && clicked} set={setReady} />
        </Suspense>
        <OrbitControls makeDefault minDistance={5} maxDistance={30} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <Overlay {...store} ref={overlay} />
    </>
  );
}

function Intro({ start, set, rotate }) {
  useEffect(() => {
    setTimeout(() => set(true), 500);
  }, []);
  const { camera } = useThree();

  useEffect(() => {
    if (start) {
      gsap.from(camera.position, { z: 100 });
      gsap.to(camera.position, { z: 50, duration: 1, ease: 'power3.inOut' });
    }
  }, []);

  useFrame((state) => {
    const { controls } = state;
    if (rotate) {
      controls.autoRotate = true;
    } else {
      controls.autoRotate = false;
    }
  })

  return null;
}
