import {useEffect, useRef} from 'react'
import planeScene from '../assets/3d/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

 //we use props as it is simple to pass into the mesh


const Plane = ({isRotating , ...props}) => {
  const ref =useRef();
    const {scene , animations} = useGLTF(planeScene);
    const {actions} = useAnimations(animations,ref);  // use the wording of the name properly like animations as it all from the react threejs
    
  //we will attach the ref in meash

  // we will use useEffect

  useEffect(()=>{
    if(isRotating){
      actions['Take 001'].play();  // research on Take 
    } else{
      actions['Take 001'].stop();
    }
  } , [actions,isRotating]
  
  )  



  return (
    <mesh {...props} ref={ref}>    
        <primitive object={scene}/>
    </mesh>
  )
}

export default Plane
