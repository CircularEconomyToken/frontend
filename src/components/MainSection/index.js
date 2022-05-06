import React from 'react'
import Video from '../../videos/intro.mp4'
import {MainContainer, MainBg, VideoBg, MainContent, MainH1,
    MainP, MainBtnWrapper} from './MainElements'
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
            <MainBtnWrapper>
                <Button to = 'signup' primary = 'true' dark = 'true'>Connect Wallet</Button>
            </MainBtnWrapper>
        </MainContent>
    </MainContainer>
  )
}

export default MainSection