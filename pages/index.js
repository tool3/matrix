import { MeshReflectorMaterial, OrbitControls, Reflector, useTexture } from '@react-three/drei';
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
import { BackSide, DoubleSide } from 'three';

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
    <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={720}
        args={[50, 50]}
        mirror={1}
        metalness={0.9}
        normalScale={[1, 1]}
        mixBlur={6}
        side={DoubleSide}
        roughnessMap={floor}
        mixStrength={2.0}
        mixContrast={1} // Contrast of the reflections
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={1} // Amount of distortion based on the distortionMap texture
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

  const overlay = useRef();
  const videoElement = useRef();
  const videoElement1 = useRef();
  const videoElement2 = useRef();

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

  const source = <source src="/videos/matrix_compressed.mp4" type='video/mp4' codecs="avc1.42E01E, mp4a.40.2" />;

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, 100], fov: 15 }}>
        <color attach="background" args={['black']} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Couch couch={couch} rotation={[0, Math.PI + 0.4, 0]} position={[1.2, 0, 0.6]} scale={[1, 1, 1]} />
            <Phone couch={couch} />
            <VideoText video={video} {...store} position={[0, 0.65, -2]} offset={1} text={'01001110'} />
            <VideoText video={video} {...store} position={[0, 2.06, -2]} offset={0} text={'01000101'} />
            <VideoText video={video} {...store} position={[0, 3.47, -2]} offset={2} text={'01001111'} />
            <Ground start={ready && clicked} />
          </group>
          {light && <spotLight position={[0, 10, 0]} intensity={10} power={10000} angle={Math.PI / 9} penumbra={1} />}
          <ambientLight intensity={0.5} />
          <Intro rotate={rotate} start={ready && clicked} set={setReady} />
        </Suspense>
        <OrbitControls makeDefault minDistance={5} maxDistance={30} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      {/* <video ref={videoElement} webkit-playsinline="true" playsInline preload="auto" loop crossOrigin="anonymous">
        {source}
      </video>
      <video ref={videoElement1} webkit-playsinline="true" playsInline preload="auto" loop crossOrigin="anonymous">
        {source}
      </video>
      <video ref={videoElement2} webkit-playsinline="true" playsInline preload="auto" loop crossOrigin="anonymous">
        {source}
      </video> */}

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
