import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Stone: THREE.Mesh;
    Grass: THREE.Mesh;
  };
  materials: {
    Gray: THREE.MeshStandardMaterial;
    Green: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function OtherModel(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("models/other.glb") as unknown as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        geometry={nodes.Stone.geometry}
        material={materials.Gray}
      />
      <mesh
        geometry={nodes.Grass.geometry}
        material={materials.Green}
      />
    </group>
  );
}

useGLTF.preload("/other.glb");
