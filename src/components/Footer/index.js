import React from 'react'
import {FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, 
    FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, 
    SocialIcons, SocialIconLink} from './FooterElements'
import {FaFacebook, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
      }

  return (
    <> 
    <FooterContainer>
        <FooterWrap>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> About us </FooterLinkTitle>
                        <FooterLink to = '/about'>How it works</FooterLink>
                        <p> <a href= "https://medium.com/@checkhaben/how-to-setup-metamask-in-your-browser-7226251ea080" 
                        style={{color:'white', fontSize:'14px', textDecoration: 'none'}} target="_blank"> 
                        How to create wallet</a> </p>
                        <FooterLink to = '/info'>Terms of Service</FooterLink>  
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Contact us </FooterLinkTitle>
                        <FooterLink to = '/info'>Contact</FooterLink>
                        <FooterLink to = '/info'>Support</FooterLink>
                        <FooterLink to = '/info'>Sponsorships</FooterLink> 
                    </FooterLinkItems> 
                </FooterLinksWrapper> 
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> Features </FooterLinkTitle>
                        <FooterLink to = '/browseOrders'>Browse orders</FooterLink>
                        <FooterLink to = '/history'>Order history</FooterLink>
                        <FooterLink to = '/offerHistory'>Offer history</FooterLink>  
                    </FooterLinkItems> 
                </FooterLinksWrapper> 
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to = '/' onClick = {toggleHome}>
                        Distributed Circular Economy
                    </SocialLogo>
                    <WebsiteRights> Distributed Circular Economy © {new Date().getFullYear()}. All rights reserved.</WebsiteRights>
                    
                </SocialMediaWrap>
            </SocialMedia>
        </FooterWrap>
    </FooterContainer>
    </>
  )
}

export default Footer