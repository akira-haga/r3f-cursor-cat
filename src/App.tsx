import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { CatModel } from "./components/CatModel";
import { OtherModel } from "./components/OtherModel";

export default function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [3, 1, 7], fov: 50 }}
      >
        <color
          attach="background"
          args={["#C9C2B6"]}
        />

        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[5, 7, 4]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        />
        <CatModel position={[0.5, -0.75, 0]} />
        <OtherModel position={[-0.5, -0.75, 1]} />
        <mesh
          position={[0, -0.75, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[1.8, 64]} />
          <meshStandardMaterial color={"#E4D5C1"} />
        </mesh>

        {/* <OrbitControls target={[0, 0, 0]} /> */}
      </Canvas>
    </div>
  );
}
