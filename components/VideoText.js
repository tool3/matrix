import React, { useState, useEffect } from 'react';
import { DoubleSide, sRGBEncoding } from 'three';
import { useThree } from '@react-three/fiber';
import {Text} from '@react-three/drei';

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
      <meshBasicMaterial toneMapped={false} side={DoubleSide}>
        <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  );
}

export default VideoText;
