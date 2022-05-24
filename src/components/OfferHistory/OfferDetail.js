import React, { useState, useEffect } from 'react';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink } from './OfferDetailElements';
import ls from 'local-storage';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { useNavigate } from "react-router-dom";

const OfferDetail = ({item}) => {

    const [successMsg, setSuccessMsg] = useState(null);
    let navigate = useNavigate(); 

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

    const confirmOffer = (item) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);

        //put inside promise
        let path = `/shipment/${item.orderOwnerAddress}/${item.orderId}/${item.offerId}`; 
        navigate(path);
        ls.set('orderName', item.orderName);
        ls.set('orderPrice', item.orderPrice);
        ls.set('orderQuantity', item.orderQuantity);
        ls.set('orderLocation', item.orderLocation);
        ls.set('orderCondition', getCondition(item.orderCondition));
        ls.set('orderUnit', getUnit(item.orderUnit));
        ls.set('orderDescription', item.orderDescription);
        ls.set('orderCategory', getCategory(item.orderCategory));
        ls.set('offerPrice', item.price.toString());
        ls.set('offerUsecase', item.usecase.toString());

        // var callPromise = contractObj.confirmOffer(item.orderOwnerAddress, item.orderId, item.offerId);
        // callPromise.then(function(result) {
        //     setSuccessMsg("Offer is confirmed!");
        //     let path = `/shipment/${item.orderOwnerAddress}/${item.orderId}/${item.offerId}`; 
        //     navigate(path);
        //     console.log(result);
        // });
    }

    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 
            <Column>
                <TitleText> Order name </TitleText>
                <Text> {item.orderName.toString()} </Text>
            </Column> 

            <Column>
                <TitleText> Order Price </TitleText>
                <Text> {item.orderPrice.toString()} </Text>
            </Column> 

            <Column>
                <TitleText> Quantity </TitleText>
                <Text> {item.orderQuantity.toString()}{getUnit(item.orderUnit.toString())} </Text>
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
                <TitleText> Offer Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Status </TitleText>
                <Text> {item.status.toString()} </Text>
            </Column> 

            {item.status == "Picked" &&
            <Column>
                <NavBtn onClick={() => {confirmOffer(item)}}>
                    <NavBtnLink to = {{pathname: ""}}>Confirm Buy</NavBtnLink>
                </NavBtn>
            </Column>
            }

            <Column>
                <Text>{successMsg}</Text>
            </Column>

        </Container>
    )
}



export default OfferDetail;