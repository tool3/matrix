import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Couch({ couch, ...props }) {
  const { nodes, materials } = useGLTF('/models/couch_opt.glb')
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

