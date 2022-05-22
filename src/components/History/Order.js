import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink} from './OrderElements';
import UpdateOrder from './UpdateOrder';
import ls from 'local-storage'

const Order = ({item}) => {

    const [successMsg, setSuccessMsg] = useState(null);

    const getUnit = (category) => {
        if (category === "1") return  "Piece";
        else if (category === "2") return  "KG";
        else if (category === "3") return  "Ton";
        else return  "Meter";
    }

    const getCategory = (category) => {
        if (category === "1") return  "Construction";
        else if (category === "2") return  "Furniture";
        else if (category === "3") return  "Vehicle";
        else if (category === "4") return  "Technology";
        else if (category === "5") return  "Service";
        else return  "Electronics";
    }

    const getCondition = (category) => {
        if (category === "1") return  "Brand new";
        else if (category === "2") return  "Broken";
        else if (category === "3") return  "Used";
        else if (category === "4") return  "Vinted";
        else return  "Refurbished";
    }

    const deleteOrder = (orderId) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
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
                <TitleText> Category </TitleText>
                <Text> {getCategory(item.categories.toString())} </Text>
            </Column>

            <Column>
                <TitleText> Quantity </TitleText>
                <Text> {item.quantity.toString()}{getUnit(item.unit.toString())}</Text>
            </Column>

            <Column>
                <TitleText> Condition </TitleText>
                <Text> {getCondition(item.condition.toString())} </Text>
            </Column>

            <Column>
                <TitleText> Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>

            <Column>
                <NavBtn onClick={() => {deleteOrder(item.orderId)}}>
                    <NavBtnLink to = {{pathname: ""}}>Delete</NavBtnLink>
                </NavBtn>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {{pathname: `/updateOrder/${item.orderId}`}}>Update</NavBtnLink>
                </NavBtn>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {{pathname: `/viewOffers/${item.orderId}`}}>View offers</NavBtnLink>
                </NavBtn>
            </Column>

            <Column>
                <Text>{successMsg}</Text>
            </Column>
            
        </Container>
    )
}

export default Order;