import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/couch.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.ARMCHAIR_TEXSET_A_0.geometry}
        material={materials.TEXSET_A}
        rotation={[-Math.PI / 2, 0, 0.19]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload('/models/couch.glb');
