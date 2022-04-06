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
                        <FooterLink to = '/connectWallet'>How it works</FooterLink>
                        <FooterLink to = '/connectWallet'>Testimonials</FooterLink>
                        <FooterLink to = '/connectWallet'>Careers</FooterLink>
                        <FooterLink to = '/connectWallet'>Investors</FooterLink>
                        <FooterLink to = '/connectWallet'>Terms of Service</FooterLink>  
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Contact us </FooterLinkTitle>
                        <FooterLink to = '/connectWallet'>Contact</FooterLink>
                        <FooterLink to = '/connectWallet'>Support</FooterLink>
                        <FooterLink to = '/connectWallet'>Destinations</FooterLink>
                        <FooterLink to = '/connectWallet'>Sponsorships</FooterLink>
                        <FooterLink to = '/connectWallet'>Investors</FooterLink> 
                    </FooterLinkItems> 
                </FooterLinksWrapper> 
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle> Business </FooterLinkTitle>
                        <FooterLink to = '/connectWallet'>Submit data</FooterLink>
                        <FooterLink to = '/connectWallet'>Ambassadors</FooterLink>
                        <FooterLink to = '/connectWallet'>Agency</FooterLink>
                        <FooterLink to = '/connectWallet'>Influencer</FooterLink>  
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle> Features </FooterLinkTitle>
                        <FooterLink to = '/connectWallet'>Orders</FooterLink>
                        <FooterLink to = '/connectWallet'>Profile</FooterLink>
                        <FooterLink to = '/connectWallet'>History</FooterLink>
                        <FooterLink to = '/connectWallet'>Payment</FooterLink>
                        <FooterLink to = '/connectWallet'>Return orders</FooterLink>  
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