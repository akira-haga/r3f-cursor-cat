import * as THREE from "three";
import React, { useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cat_Black: THREE.SkinnedMesh;
    Cat_White: THREE.SkinnedMesh;
    Root: THREE.Bone;
    Neck: THREE.Bone;
    Head: THREE.Bone;
  };
  materials: {
    Black: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function CatModel(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/cat.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;
  const neckRef = useRef<THREE.Bone>(nodes.Neck);
  const headRef = useRef<THREE.Bone>(nodes.Head);

  useFrame((state) => {
    const px = state.pointer.x;
    const py = state.pointer.y;

    let targetAngleY = px * 2;
    let targetAngleX = -py * 2;
    let targetAngleZ = -px * 0.3;

    const lookSideAmount = Math.abs(px);
    targetAngleX -= lookSideAmount * 0.4;

    targetAngleY = THREE.MathUtils.clamp(targetAngleY, -0.8, 0.8);
    targetAngleX = THREE.MathUtils.clamp(targetAngleX, -0.8, 0.2);
    targetAngleZ = THREE.MathUtils.clamp(targetAngleZ, -0.3, 0.3);

    const neckRatio = 0.6;
    const headRatio = 0.4;

    if (neckRef.current && headRef.current) {
      neckRef.current.rotation.y = THREE.MathUtils.lerp(
        neckRef.current.rotation.y,
        targetAngleY * neckRatio,
        0.1
      );
      neckRef.current.rotation.x = THREE.MathUtils.lerp(
        neckRef.current.rotation.x,
        targetAngleX * neckRatio,
        0.1
      );
      neckRef.current.rotation.z = THREE.MathUtils.lerp(
        neckRef.current.rotation.z,
        targetAngleZ * neckRatio,
        0.1
      );

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetAngleY * headRatio,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetAngleX * headRatio - 0.1,
        0.1
      );
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        targetAngleZ * headRatio,
        0.1
      );
    }
  });

  return (
    <group
      {...props}
      dispose={null}
    >
      <group
        position={[0, 0, 0]}
        scale={1}
      >
        <primitive object={nodes.Root} />
        <skinnedMesh
          castShadow
          geometry={nodes.Cat_Black.geometry}
          material={materials.Black}
          skeleton={nodes.Cat_Black.skeleton}
        />
        <skinnedMesh
          castShadow
          geometry={nodes.Cat_White.geometry}
          material={materials.White}
          skeleton={nodes.Cat_White.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/cat.glb");
