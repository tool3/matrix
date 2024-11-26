import { Text } from '@react-three/drei';
import React, { useEffect } from 'react';
import { DoubleSide, LinearFilter } from 'three';

function VideoText({ videoElement, video: videoOn, clicked, text, offset, ...props }) {
  // if (videoElement === undefined) return <></>;
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
        {videoElement && <videoTexture attach="map" args={[videoElement]} />}
      </meshBasicMaterial>
    </Text>
  );
}

export default VideoText;
