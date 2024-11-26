import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { DoubleSide, sRGBEncoding } from 'three';

function VideoText({ videoElement, video: videoOn, clicked, text, offset, ...props }) {
  if (videoElement === undefined) return null;
  useEffect(() => {
    if (clicked) {
      videoElement.currentTime = offset || 0;
      videoElement.play();
    }

    if (!videoOn) {
      videoElement.pause();
    }
  }, [videoElement, clicked, videoOn]);

  return (
    <Text font="/fonts/ShareTechMono.ttf" fontSize={2} letterSpacing={-0.1} {...props}>
      {text}
      <meshBasicMaterial toneMapped={false} side={DoubleSide}>
        <videoTexture attach="map" args={[videoElement]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  );
}

export default VideoText;
