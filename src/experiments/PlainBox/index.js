import React from "react";
import { Controllers, RayGrab } from "@react-three/xr";
import { Sky, Plane, Box, OrbitControls } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";

function PlainBox(){
    return(
        <Canvas>
            <Sky />
            <Plane
                args={[100, 100]}
                position={[0, -1, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <meshStandardMaterial attach="material" color="#fff" />
            </Plane>
            <ambientLight intensity={0.1} />
            <Controllers />
            <RayGrab>
                <Box rotation={[0, 1, 2]}>
                <meshStandardMaterial color={'blue'} />
                </Box>
            </RayGrab>
        
        </Canvas>
    )
}

export default PlainBox;