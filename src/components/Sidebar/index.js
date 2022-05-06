import React from 'react'
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu,
    SidebarLink, SideBtnWrapper, SidebarRoute} from './SidebarElements'

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen = {isOpen} onClick = {toggle}>
        <Icon onClick = {toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to = 'about' onClick = {toggle}> About </SidebarLink>
                <SidebarLink to = 'browseOrders' onClick = {toggle}> Browse orders </SidebarLink>
                <SidebarLink to = 'history' onClick = {toggle}> Order history </SidebarLink>
            </SidebarMenu>
        </SidebarWrapper>
        <SideBtnWrapper>
            <SidebarRoute to = '/connectWallet'> Connect Wallet </SidebarRoute>
        </SideBtnWrapper>
    </SidebarContainer>
  )
}

export default Sidebar