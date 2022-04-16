import React, {useState} from 'react'
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo } from '../components/InfoSection/Data';
import MainSection from '../components/MainSection';
 
const Home = () => {

  return (
    <> 
        <MainSection/>
        <InfoSection { ...homeObjOne }/>
        <InfoSection { ...homeObjTwo }/>
    </>
  )
}

export default Home