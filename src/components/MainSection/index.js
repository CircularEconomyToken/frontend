import React from 'react'
import Video from '../../videos/intro.mp4'
import {MainContainer, MainBg, VideoBg, MainContent, MainH1,
    MainP, MainBtnWrapper, NavBtnLink} from './MainElements'
import {Button} from '../ButtonElements'

const MainSection = () => {
  return (
    <MainContainer>
        <MainBg>
            <VideoBg autoPlay loop muted src = {Video} type = 'video/mp4'/>
        </MainBg>
        <MainContent>
            <MainH1>Distributed Circular Economy </MainH1>
            <MainP>Give your products a new life</MainP>

            <MainBtnWrapper>
                <NavBtnLink to = '/connectWallet' primary = 'true' dark = 'true'>Connect Wallet</NavBtnLink>
            </MainBtnWrapper>
        </MainContent>
    </MainContainer>
  )
}

export default MainSection