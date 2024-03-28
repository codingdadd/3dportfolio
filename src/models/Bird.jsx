import {useRef , useEffect} from 'react';
import birdScene from '../assets/3d/bird.glb';
import { View, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';



const Bird = ({}) => {
    const {scene , animations} = useGLTF(birdScene);
    const birdRef = useRef();
    const {actions} = useAnimations(animations,birdRef) // actionn is called from the animations in the 

    useEffect(() => { 
      actions['Take 001'].play();
    },[]);

    //use frame also has two properties 1 clock 2 camera 
    useFrame(({ clock , camera}) => {  
      // update y position for birf like flying using sin wave position for flight simulation 
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2   ; //elapaetime will keep track of total time

      // changing the bird rotation 180 degree on y axis 
      if(birdRef.current.position.x > camera.position.x + 10){
        birdRef.current.rotation.y = Math.PI;

        // change the bird direction and to forward and reset the rotaion
      }else if(birdRef.current.position.x < camera.position.x - 10 ){
        birdRef.current.rotation.y = 0;
      }
       // bird going forward (need to work on it as it is not)
      if(birdRef.current.rotation.y === 0){
        birdRef.current.position.x += 0.01;
        birdRef.current.position.z -= 0.01;
      }// bird going backward (need to work on it as it is not)
      else{
        birdRef.current.position.x -= 0.01;
        birdRef.current.position.z += 0.01;
      }

    });

  return (
    <mesh ref={birdRef} position={[-5,2,1]} scale={[0.003,0.003,0.003]}>
        <primitive object={scene}/>
    </mesh>
  )
}

export default Bird
