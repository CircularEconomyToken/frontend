import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const Container = styled.div`
    flex: 1;
    min-width: 280px;
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid lightgrey;
    margin-top: 20px;
    border-radius: 2px;
`

export const Image = styled.img`
    max-width: 50px;
    margin: 0 0 10px 20px;
    padding-right: 0;
`

export const TitleText = styled.p`
    font-size: 12px;
    margin-left: 20px;
    margin-right: 20px;
    color: ${({ lightText }) => (lightText ? '#f7f8fa ' : '#010606')};
`

export const Text = styled.p`
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
    color: ${({ lightText }) => (lightText ? '#f7f8fa ' : '#010606')};
`

export const Column = styled.div`
    width: 200px;
    margin-bottom: 15px;
    padding: 0 15px;
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
    font-size: 12px;
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

export const IconColumn = styled.div`
    width: 80px;
    margin-bottom: 15px;
    padding: 0 5px;
`
export const IconLink = styled(LinkR)`
    border-radius: 20px;
    white-space: nowrap;
    padding: 5px 5px;
    color: #010606;
    font-size: 12px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #dbbea1ff;
        color: #010606;
    }
`
