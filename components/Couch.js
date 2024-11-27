import { useGLTF, useProgress } from '@react-three/drei';
import React, { useEffect } from 'react';

export default function Couch({ ...props }) {
  const { couch, setProgress, setReady } = props;
  const { nodes, materials } = useGLTF('/models/couch_opt.glb');
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setReady(true);
    } else {
      setProgress(progress);
    }
  }, [progress]);

  return (
    <group visible={couch} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ARMCHAIR_TEXSET_A_0.geometry}
        material={materials.TEXSET_A}
        position={[-0.021, 0.538, -0.11]}
        rotation={[-Math.PI / 2, 0, 0.19]}
        scale={0.538}
      />
    </group>
  )
}

useGLTF.preload('/models/couch_opt.glb')

