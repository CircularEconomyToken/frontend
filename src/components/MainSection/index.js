import React from 'react'
import Video from '../../videos/intro.mp4'
import {MainContainer, MainBg, VideoBg, MainContent, MainH1,
    MainP, MainBtnWrapper, NavBtn, NavBtnLink} from './MainElements'
import {Button} from '../ButtonElements'

const MainSection = () => {
  return (
    <MainContainer>
        <MainBg>
            <VideoBg autoPlay loop muted src = {Video} type = 'video/mp4'/>
        </MainBg>
        <MainContent>
            <MainH1>ReCircle</MainH1>
            <MainP>Give your products a new life</MainP>
            <NavBtn>
                <NavBtnLink to = '/connectWallet' primary = 'true' dark = 'true'>Connect Wallet</NavBtnLink>
            </NavBtn>
        </MainContent>
    </MainContainer>
  )
}

export default MainSection