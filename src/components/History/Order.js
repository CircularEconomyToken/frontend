import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink} from './OrderElements';
import { Row } from './MakeOrderElements';

const Order = ({item}) => {

    const [successMsg, setSuccessMsg] = useState(null);

    const deleteOrder = (orderId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = "0xd181D7c2eF5cF4744fe079A4c89CB5D5CDB29853";
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        
        var callPromise = contractObj.deleteOrder(orderId);
        callPromise.then(function(result){
            setSuccessMsg("Order is deleted!");
            console.log(result);
        });
    }

    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 

            <Column>
                <TitleText> Name </TitleText>
                <Text> {item.name.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Unit </TitleText>
                <Text> {item.unit.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Category </TitleText>
                <Text> {item.categories.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Quantity </TitleText>
                <Text> {item.quantity.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>

            <Column>
                <NavBtn onClick={() => {deleteOrder(item.orderId);}}>
                    <NavBtnLink to = {{pathname: ""}}>Delete</NavBtnLink>
                </NavBtn>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {{pathname: `/updateOrder/${item.orderId}`}}>Update</NavBtnLink>
                </NavBtn>
            </Column>
            <Column>
                <Text>{successMsg}</Text>
            </Column>
            
        </Container>
    )
}

export default Order;