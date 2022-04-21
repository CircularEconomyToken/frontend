import styled from 'styled-components'

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