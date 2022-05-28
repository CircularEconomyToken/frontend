import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const InfoContainer = styled.div`
    color: #fff;
    background: red;
    background: ${({ lightBg }) => (lightBg ? '#E1E1E1' : '#010606')};
    min-height: 360px;
    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`

export const InfoWrapper = styled.div`
    /* height: 2000px; */
    display: flex;
    flex-direction: column;
    justify-content: top;
    max-width: 1100px;
    margin: 0 auto;
`

export const OrderContainer = styled.div`
    background: white;
    border-radius: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;
`

export const Title = styled.h2`
    margin-top: 100px; 
`

export const EmptyView = styled.div`
    height: 20px; 
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Filter = styled.div`
    margin: 20px;
    max-width: 1100px;
    display: flex;  
    flex-direction: row;
    justify-content : space-between;
    width: 100%;
`

export const FilterText = styled.span`
    display: flex;
    align-items: center;
    flex: 5;
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`

export const Select = styled.select`
    display: flex;
    flex: 3;
    margin-right: -500px;
    align-items: flex-start;
    padding: 10px;
    border-radius: 20px;
    margin-right: 20px;
`

export const Option = styled.option``

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

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #000;
    font-size: 14px;
`
