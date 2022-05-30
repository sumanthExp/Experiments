import React, { Suspense, useRef, useEffect } from "react";
import {
    Float,
    Environment,
    OrbitControls,
    useHelper,
    Stats,
    Stars,
    SpotLight,
    FirstPersonControls,
    Sparkles
  } from "@react-three/drei";
import { VRCanvas, useXR, useXREvent, DefaultXRControllers, useController } from "@react-three/xr";
import { SpotLightHelper, PointLightHelper, DoubleSide, NoToneMapping} from "three";
import { useFrame, addEffect } from "@react-three/fiber";
import { Globals } from "@react-spring/shared";

import Grid from "./components/Grid";
import "wipe.css";

let nextFrame = undefined;

const XR = () => {
  const { player, isPresenting } = useXR();
  const leftController = useController('left')

  
  useXREvent('squeezestart', () => {
    player.position.x += 0.1
    player.position.y += 0.1
  }, { handedness: 'right'})

  useXREvent('squeezestart', () => {
    player.position.x -= 0.1
    player.position.y -= 0.1
  }, { handedness: 'left'})

  useEffect(() => {
    if (isPresenting) {
      player.position.z += 1;
    } else {
      player.position.x = 0;
      player.position.y = 0;
      player.position.z = 0;
    }
  }, [player, isPresenting]);

  return null;
};

addEffect(() => {
  if (nextFrame) nextFrame();
  return true;
});

Globals.assign({
  requestAnimationFrame: (cb) => (nextFrame = cb)
});

const Scene = () => {
  const box = useRef();
  const floor = useRef();
  
  return (
    <>
      <Stars radius={500} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles />
      <mesh ref={floor} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[10, 10]} />
        <meshStandardMaterial
          attach="material"
          color="#000"
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>
    </>
  );
};

const Lights = () => {
  const spotLight1 = useRef();

  useHelper(spotLight1, SpotLightHelper, "magenta");

  return (
    <>
      <ambientLight intensity={0.4} />
      <SpotLight distance={5}
        angle={0.15}
        attenuation={15}
        anglePower={5} 
      />
    </>
  );
};

const WebGL = () => {
  return (
    <VRCanvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false
      }}
      style={{ height: "1000px"}}
    >
      <fog attach="fog" args={["#000", 1, 100]} />
      <Suspense fallback={"loading"}>
        <Scene />
        <Grid />
        <Lights />
        <Environment preset="sunset" />
        <OrbitControls
          maxDistance={6}
          minDistance={2}
          maxPolarAngle={Math.PI * 0.25}
          minPolarAngle={Math.PI * 0.25}
          autoRotate
        />
        
      </Suspense>
      <XR />
      <DefaultXRControllers />
    </VRCanvas>
  );
};

export default function ThreeD() {
  return (
    <div>
      <WebGL />
    </div>
  );
}
