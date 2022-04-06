import React, {useState} from 'react'
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import { homeObjFour, homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import MainSection from '../components/MainSection';
 
const Home = () => {

  return (
    <> 
        <MainSection/>
        <InfoSection { ...homeObjOne }/>
        <InfoSection { ...homeObjTwo }/>
        <InfoSection { ...homeObjThree }/>
        <InfoSection { ...homeObjFour }/>
        <Footer/>
    </>
  )
}

export default Home