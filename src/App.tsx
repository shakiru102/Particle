
import { ContactShadows, Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Camera, Mesh, PlaneGeometry } from 'three'
import './App.css'

function App() {

  const angleToRadian = (angle: number) => (Math.PI / 180) * angle

  const [count , setCount ] = useState<number>(5000)
  const camera = useRef<Camera>()
  const particle = useRef<Mesh>()

  const bufferArray = useMemo(() => {
   const buffer32Array = new Float32Array(count * 3 * 3)
   for (let i = 0; i < count ; i++) {
    buffer32Array[i] = Math.random() 
   }
   return buffer32Array
  },[count])

  useEffect(() => {
   if(camera.current && particle.current) {
      camera.current?.lookAt(particle.current?.position)
   }
  },[camera.current, particle.current])

  return (
   <Canvas id='webgl' >
     <Suspense fallback={<div>Loading...</div>}>
      <PerspectiveCamera ref={camera} makeDefault position={[0, angleToRadian(60), 6]}/>
       <OrbitControls minPolarAngle={angleToRadian(60)} maxPolarAngle={angleToRadian(60)} enableZoom={false} />
         <Float
         speed={5}
         >
       {/* @ts-ignore */}
         <mesh ref={particle} position={[0, 0.5, 0]}>
          {/* <boxGeometry args={[1, 1, 1]}/> */}
          <bufferGeometry>
            <bufferAttribute 
            array={bufferArray}
            count={bufferArray.length / 3}
            attach={'attributes-position'}
            itemSize={3}
            />
          </bufferGeometry>
          <meshBasicMaterial wireframe color={'white'} />
         </mesh>
         </Float>
         <ContactShadows
         blur={4}
         opacity={0.5}
         />
     </Suspense>
   </Canvas>
  )
}

export default App
