import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, Navlogo, MobileIcon, NavMenu, NavItem, NavLinks,
  NavBtn, NavBtnLink} from './NavbarElements'
import {IconContext} from 'react-icons/lib'
import { animateScroll as scroll } from 'react-scroll'

const Navbar = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
    <>
    <IconContext.Provider value = {{color: '#fff'}}>
      <Nav scrollNav = {scrollNav}>
          <NavbarContainer>
              <Navlogo to = '/' onClick = {toggleHome}> Circular Economy </Navlogo>
              <MobileIcon onClick = {toggle}>
                <FaBars/>
              </MobileIcon>
              <NavMenu>
                <NavItem>
                  <NavLinks to = 'about'
                  smooth = {true} duration = {500} spy = {true} exact = 'true' offset = {-80} 
                  >About</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to = 'browseOrders'
                   smooth = {true} duration = {500} spy = {true} exact = 'true' offset = {-80} 
                   >Browse Orders</NavLinks>
                </NavItem>
                
                <NavItem>
                  <NavLinks to = 'history'
                   smooth = {true} duration = {500} spy = {true} exact = 'true' offset = {-80} 
                  >Trade History</NavLinks>
                </NavItem>
              </NavMenu>
              <NavBtn>
                <NavBtnLink to = '/connectWallet'>Connect Wallet</NavBtnLink>
              </NavBtn>
          </NavbarContainer>
      </Nav>
    </IconContext.Provider>
    </>
  )
}

export default Navbar 