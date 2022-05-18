import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const InfoContainer = styled.div`
    color: #fff;
    background: red;
    background: ${({ lightBg }) => (lightBg ? '#E1E1E1' : '#010606')};

    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`

export const InfoWrapper = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    max-width: 1100px;
    margin: 0 auto;
`


export const Title = styled.h3`
    margin-top: 200px; 
`

export const EmptyView = styled.div`
    height: 20px; 
`

export const NavBtn = styled.div`
    display: flex;
    flex: 1;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #01BF71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #dbbea1ff;
        color: #010606;
    }
`