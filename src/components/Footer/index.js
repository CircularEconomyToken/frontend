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
                        <div> <a href= "https://medium.com/@checkhaben/how-to-setup-metamask-in-your-browser-7226251ea080" target="_blank"> How to create wallet</a> </div>
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
                        Circular Economy
                    </SocialLogo>
                    <WebsiteRights> Circular Economy © {new Date().getFullYear()}. All rights reserved.</WebsiteRights>
                    <SocialIcons>
                        <SocialIconLink href = '//www.facebook.com/' target = '_blank' aria-label = 'Facebook'>
                            <FaFacebook/>
                        </SocialIconLink>
                        <SocialIconLink href = '//www.instagram.com/' target = '_blank' aria-label = 'Instagram'>
                            <FaInstagram/>
                        </SocialIconLink>
                        <SocialIconLink href = '//www.linkedin.com/'  target = '_blank' aria-label = 'Linkedin'>
                            <FaLinkedin/>
                        </SocialIconLink>
                        <SocialIconLink href = '//www.youtube.com/' target = '_blank' aria-label = 'Youtube'>
                            <FaYoutube/>
                        </SocialIconLink>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterWrap>
    </FooterContainer>
    </>
  )
}

export default Footer