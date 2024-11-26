import { Text } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { DoubleSide } from 'three';

function VideoText({ video, videoOn, clicked, text, offset, ...props }) {

  useEffect(() => {
      if (clicked) {
        video.setAttribute('playsinline', true);
        video.currentTime = offset || 0;
        video.play();
      }

      if (!videoOn) {
        video.pause();
      }
  }, [video, clicked, videoOn]);

  return (
    <Text font="/fonts/ShareTechMono.ttf" fontSize={2} letterSpacing={-0.1} {...props}>
      {text}
      <meshBasicMaterial toneMapped={false} side={DoubleSide}>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </Text>
  );
}

export default VideoText;
