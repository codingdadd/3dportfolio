import React from 'react'
import { Link } from 'react-router-dom'; // 1st word should start in capital letter .
import {arrow} from '../assets/icons'


// this will be arrow function with asentric return
const InfoBox = ({text,link, btnText}) =>(
<div className='info-box'>
    <p className='font-medium sm:text-xl text-center '>{text}</p>
    <Link to={link} className='neo-brutalism-white neo-btn'>
        {btnText}
        <img src={arrow}/>
    </Link>
</div>

);

//this is a react trick or cheat sheet 
const renderContent = {
    1:(
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white
        mx-f">Hi, I am <span className='font-semibold'>William michael</span>
        <br/>
        Welcome to my portfolio
        </h1>
    ),
    2:(
      <InfoBox
      text="I am a front-end developer and also a 3d artist "
      link="./About"
      btnText="learn more"
      />
    ),
    3:(
        <InfoBox
      text="Let's view some awesome projects collection "
      link="./Porject"
      btnText="View projects"
      /> 
    ),
    4:(
        <InfoBox
        text="Liked my work ? Why wait . Just click on the button below"
        link="./Contact"
        btnText="Let's talk"
        /> 
    ),

}
const HomeInfo = ({currentStage}) => {
    
    
// this will render the current stage number or return null 
  return renderContent [currentStage] || null;
    
}

export default HomeInfo
