import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    min-height: 692px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 120px;
    padding-bottom: 120px;
    z-index: 0;
    overflow: hidden;
    background: #01bf71;
    /* linear-gradient(
        108deg,
        rgba(1, 147, 86, 1) 0%,
        rgba(10, 201, 122, 1) 100%,
    );  */
`  
export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    //width: 500px;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

export const Icon = styled(Link)`
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.form`
   background: #010101;
   max-width: 850px;
   height: auto;
   width: 100%;
   z-index:1;
   display: grid;
   margin: 0 auto;
   padding: 80px 32px;
   border-radius: 4px;
   display: flex;
   flex-direction: column;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

   @media screen and (max-width: 400px) {
        padding: 32px 32px; 
    }
`

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 4px;
`

export const Row = styled.div`
    min-width: 280px;
    display: flex;
    // align-items: center;
    flex-direction: row;
    justify-content : space-between;
`

export const Column = styled.div`
    width: 225px;
    margin-bottom: 15px;
    padding: 0 15px;
`

export const FormButton = styled.button`
    background: #01bf71;
    padding: 16px 0;
    width: 180px;
    margin:0 auto;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
`

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`
export const FormTextArea = styled.textarea`
    padding: 16px 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 4px;
`