import { Backdrop, Text, useVideoTexture } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { DoubleSide, LinearFilter, NearestFilter } from 'three';

function VideoMaterial({ offset }) {
  const texture = useVideoTexture('/videos/dest.mp4', {
    crossOrigin: 'anonymous',
    loop: true,
    preload: 'auto',
    currentTime: offset
  });

  // texture.repeat.x = 100;
  // texture.repeat.y = 1;
  // texture.repeat.
  return <meshBasicMaterial side={DoubleSide} map={texture} toneMapped={false} />
}

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

  // return (
  //   <Text font="/fonts/ShareTechMono.ttf" fontSize={2} letterSpacing={-0.1} {...props}>
  //     {text}
  //     <VideoMaterial offset={offset} />
  //   </Text>
  // );

  return (
    <mesh position={[0, 5, 0]}>
      <planeGeometry args={[20, 10]} />
      {/* <sphereGeometry  scale={1} args={[100, 100, 100]} /> */}
      <VideoMaterial offset={offset} />
    </mesh>
  )
}

export default VideoText;
