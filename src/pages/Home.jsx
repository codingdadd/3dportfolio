import {useState , Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/loader';
import  Island from '../models/island';
import Sky from  '../models/Sky';
import Plane from '../models/Plane';
import Bird from '../models/Bird';

const home = () => {
const [isRotating, setIsRotating] = useState(false);
const [currentStage , setCurrentStage] = useState(1);   // this is to understand on which stage we are


  const adjustIslandForScreenSize =() => {
    let screenScale = null;
    let screenPosition = [0,-6.5,-43]  ;
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9,0.9,0.9];
      
    }
    else{
      screenScale = [1 ,1 ,1];
      
    }
    return [screenScale,screenPosition, rotation];
    }
    
  
    const adjustPlaneForScreenSize =() => {
      let screenScale, screenPosition ;
      
  
      if(window.innerWidth < 768){
        screenScale = [1.5,1.5,1.5];
        screenPosition=[0,-1.5,0];
      }
      else{
        screenScale = [3,3,3];
        screenPosition = [0,-4,4];
        
      }
      return [screenScale,screenPosition];
      }
      const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
      const [planeScale , planePosition ] =  adjustPlaneForScreenSize();

  return (
   <section className='w-full h-screen relative'>
   <Canvas 
   className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
   camera={{near:0.1 , far:1000}}>
    <Suspense fallback={<Loader/>}>
      <directionalLight position={[1,1,0]} intensity={2}/>
      <ambientLight intensity={0.5}/>
      {/* <pointLight/> */}
      {/* <spotLight/> */}
      <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"
      intensity={1}/>
      <Sky/>
      <Bird/>
      
      <Island
      position={islandPosition}
      scale={islandScale}
      rotation={islandRotation}
      isRotating={isRotating}
      setIsRotating={setIsRotating}
      currentStage={setCurrentStage}
      />
      <Plane
      isRotating={isRotating}
      planePosition={planePosition}
      planeScale={planeScale}
      rotation={[0,10,0]}
      />      

    </Suspense>

   </Canvas>


   </section>
  )
}

export default home
