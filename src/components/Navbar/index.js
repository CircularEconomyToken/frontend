import React, {useState, useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import {Nav, NavbarContainer, Navlogo, MobileIcon, NavMenu, NavItem, NavLinks,
  NavBtn, NavBtnLink} from './NavbarElements'
import {IconContext} from 'react-icons/lib'
import { animateScroll as scroll } from 'react-scroll'

const Navbar = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)
  const [showButton, setVisibility] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    checkWalletConnection();
  }, [])


  const checkWalletConnection = async (e) => {
    if (window.ethereum) { 
      window.ethereum.request({ method: 'eth_accounts' }).then(result => {
        if (result.length === 0) { // MetaMask is locked or the user has not connected any accounts
          setVisibility(false);
        }
        else {
          setVisibility(true);
        }
    })
    } 
  }  

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
    <>
    <IconContext.Provider value = {{color: '#fff'}}>
      <Nav scrollNav = {scrollNav}>
          <NavbarContainer>
              <Navlogo to = '/' onClick = {toggleHome}> DCE </Navlogo>
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
                  >Order History</NavLinks>
                </NavItem>

                <NavItem>
                  <NavLinks to = 'offerHistory' className={({ isActive }) => (isActive ? "link-active" : "link")}
                   smooth = {true} duration = {500} spy = {true} exact = 'true' offset = {-80} 
                  >Offer History</NavLinks>
                </NavItem>

              </NavMenu>
              {showButton? <NavBtn>
                <NavBtnLink to = '/makeOrder'> Add new item </NavBtnLink>
              </NavBtn> :
              <NavBtn>
              <NavBtnLink to = '/connectWallet'> Connect wallet </NavBtnLink>
            </NavBtn>
            }
          </NavbarContainer>
      </Nav>
    </IconContext.Provider>
    </>
  )
}

export default Navbar 