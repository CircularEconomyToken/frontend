import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink} from './OrderElements';
import UpdateOrder from './UpdateOrder';
import ls from 'local-storage'

const Offer = ({item, orderId, offerId}) => {

    const [successMsg, setSuccessMsg] = useState(null);

    const pickOffer = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        var callPromise = contractObj.pickOffer(orderId, offerId);
        callPromise.then(function(result) {
            setSuccessMsg("Offer is picked!");
            console.log(result);
        });
    }

    useEffect(() => {
        console.log(item);
      }, []);

    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 

             <Column>
                <TitleText> Usecase </TitleText>
                <Text> {item.usecase.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Earliest Block </TitleText>
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

            {(item.status == "Active" || item.status == "active") &&
            <Column>
                <NavBtn onClick={() => {pickOffer()}}>
                    <NavBtnLink to = {{pathname: ""}}>Pick offer</NavBtnLink>
                </NavBtn>
            </Column>
            }

            <Column>
                <Text>{successMsg}</Text>
            </Column>
            
        </Container>
    )
}

export default Offer;