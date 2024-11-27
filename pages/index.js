import { MeshReflectorMaterial, OrbitControls, Reflector, useHelper, useProgress, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Howl } from 'howler';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Couch from '../components/Couch';
import Overlay from '../components/Overlay';
import Phone from '../components/Phone';
import secondary from '../components/sounds/secondary_wav.wav';
import main from '../components/sounds/main_wav.wav';
import VideoText from '../components/VideoText';
import Ground from '../components/Ground';
import { DirectionalLightHelper, Object3D, SpotLightHelper, Vector3 } from 'three';

const tracks = {
  main: new Howl({
    src: [secondary],
    format: ['wav'],
    preload: true,
    loop: true,
    volume: .2,
  }),
  secondary: new Howl({
    src: [main],
    format: ['wav'],
    preload: true,
    loop: true,
    volume: .2,
  }),
}

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);

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
            <Couch setReady={setReady} couch={couch} rotation={[0, Math.PI + 0.4, 0]} position={[1.2, 0, 0.6]} scale={[1, 1, 1]} />
            <Phone couch={couch} />
            <VideoText video={video} videoOn={videoOn} {...store} position={[0, 0.63, -2]} offset={1} text={'01001110'} />
            <VideoText video={video1} videoOn={videoOn} {...store} position={[0, 2.06, -2]} offset={0} text={'01000101'} />
            <VideoText video={video2} videoOn={videoOn} {...store} position={[0, 3.47, -2]} offset={2} text={'01001111'} />
            <Ground start={ready && clicked} />
          </group>
          {light && <spotLight position={[0, 10, 0]} intensity={10} power={10000} angle={Math.PI / 9} penumbra={1} />}
          {/* <directionalLight position={[0, 10, 5]} intensity={10} power={100} />; */}
          <ambientLight intensity={1} />
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
  const dir = useRef();
  useHelper(dir, DirectionalLightHelper);
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
  });

  return <directionalLight position={[0, 10, 5]} intensity={10} power={100} />;
}
