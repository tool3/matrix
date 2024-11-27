import { MeshReflectorMaterial, OrbitControls, Reflector, useProgress, useTexture } from '@react-three/drei';
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

function Ground() {
  const [floor, normal] = useTexture([
    '/textures/SurfaceImperfections003_1K_var1.jpg',
    '/textures/SurfaceImperfections003_1K_Normal.jpg'
  ]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[600, 100]}
        resolution={720}
        args={[50, 50]}
        mirror={.9}
        metalness={0.9}
        normalScale={[1, 1]}
        mixBlur={6}
        roughnessMap={floor}
        mixStrength={2.0}
        mixContrast={1}
        depthScale={0}
        minDepthThreshold={0.9}
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

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const [track, setTrack] = useState('main');
  const [light, setLight] = useState(false);
  const [couch, setCouch] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [sound, setSound] = useState(false);

  const overlay = useRef();

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
    videoOn,
    setVideoOn,
    sound,
    setSound,
    progress,
    setProgress,
    track,
    setTrack
  }

  useEffect(() => {
    if (sound) {
      tracks.main.stop();
      tracks.secondary.stop();
      tracks[track].play();
    } else {
      tracks.main.stop();
      tracks.secondary.stop();
    }
  }, [sound, track])

  const videoProps = {
    src: '/videos/dest.mp4',
    crossOrigin: 'anonymous',
    loop: true,
    preload: 'auto',
  };

  const [video, setVideo] = useState(null);
  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);

  useEffect(() => {
    setVideo(Object.assign(document?.createElement('video'), videoProps))
    setVideo1(Object.assign(document?.createElement('video'), videoProps))
    setVideo2(Object.assign(document?.createElement('video'), videoProps))
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Couch setProgress={setProgress} setReady={setReady} couch={couch} rotation={[0, Math.PI + 0.4, 0]} position={[1.2, 0, 0.6]} scale={[1, 1, 1]} />
            <Phone couch={couch} />
            <VideoText video={video} videoOn={videoOn} {...store} position={[0, 0.65, -2]} offset={1} text={'01001110'} />
            <VideoText video={video1} videoOn={videoOn} {...store} position={[0, 2.06, -2]} offset={0} text={'01000101'} />
            <VideoText video={video2} videoOn={videoOn} {...store} position={[0, 3.47, -2]} offset={2} text={'01001111'} />
            <Ground start={ready && clicked} />
          </group>
          {light && <spotLight position={[0, 10, 0]} intensity={10} power={10000} angle={Math.PI / 9} penumbra={1} />}
          <ambientLight intensity={0.5} />
          <Intro rotate={rotate} start={ready && clicked} set={setReady} />
        </Suspense>
        <OrbitControls makeDefault minDistance={5} maxDistance={30} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      <Overlay {...store} ref={overlay} />
    </>
  );
}

function Intro({ start, rotate }) {
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
