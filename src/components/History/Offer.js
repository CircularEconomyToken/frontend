import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink} from './OrderElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ls from 'local-storage'

const Offer = ({item, orderId, offerId, name}) => {

    const [buttonText, setText] = React.useState((item.status == "Picked")? "Already picked": "Pick offer");

    const pickOffer = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        var callPromise = contractObj.pickOffer(orderId, offerId);
        callPromise.then(function(result) {
            toast.success("Offer is picked!");
            setText("Already picked");
            setTimeout(function() {
                window.location='/history'
              }, 5000);
        });
    }

    useEffect(() => {
        console.log(item);
      }, []);

    return(
    
        <Container>

            <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} 
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>

            <Image src = {require('../../images/package.png')}/> 

            <Column>
                <TitleText> Item name </TitleText>
                <Text> {name} </Text>
            </Column>

             <Column>
                <TitleText> Usecase </TitleText>
                <Text> {item.usecase.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Earliest Day of Pick Up </TitleText>
                <Text> {item.earliestBlock.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Status </TitleText>
                <Text> {item.status.toString()} </Text>
            </Column> 

            <Column>
                <NavBtn onClick={(item.status != "Picked")? () => {pickOffer()}: ""}>
                    <NavBtnLink to = {{pathname: ""}}>{buttonText}</NavBtnLink>
                </NavBtn>
            </Column>
            
            
        </Container>
    )
}

export default Offer;