import React, { useState, useEffect } from 'react';
import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink } from './OfferDetailElements';
import ls from 'local-storage';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import erc20abiApprove from '../../erc20abiApprove.json';
import { useNavigate } from "react-router-dom";

const OfferDetail = ({item}) => {

    const [contract, setContract] = useState(null);
    const [isApproveAllowed, setIsApproveAllowed] = useState(false);
    const [isConfirmAllowed, setIsConfirmAllowed] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    let navigate = useNavigate(); 

    useEffect(() => {
        getInitialData();
    }, []);

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

    const getInitialData = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = "0x67f6a7BbE0da067A747C6b2bEdF8aBBF7D6f60dc";
        ls.set('contractAddrApprove', contractAddr);
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abiApprove, signer);
        setContract(contractObj);
        var callPromise = contractObj.allowance(ls.get('userAddr'), ls.get('contractAddr'));
        callPromise.then(function(result) {
            console.log(parseFloat(result));
            if (result == 0) {
                setIsApproveAllowed(true)
            } else {
                setIsConfirmAllowed(true);
            }
        });
    }

    const approveOffer = () => {
        var max = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        console.log("appr: ", ls.get('contractAddrApprove'));
        var callPromise = contract.approve(ls.get('contractAddr'), max);
        callPromise.then(function(result) {
            console.log("approved", result);
            setIsApproveAllowed(false);
            setIsConfirmAllowed(result);
        });
    }

    const confirmOffer = (item) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        var callPromise = contractObj.confirmOffer(item.orderOwnerAddress, item.orderId, item.offerId);
        callPromise.then(function(result) {
            setSuccessMsg("Offer is confirmed!");
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
            let path = `/shipment/${item.orderOwnerAddress}/${item.orderId}/${item.offerId}`; 
            navigate(path);
            console.log(result);
        });
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
                <TitleText> Earliest Block </TitleText>
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

            {item.status == "Picked" && isApproveAllowed &&
            <Column>
                <NavBtn onClick={() => {approveOffer(item)}}>
                    <NavBtnLink to = {{pathname: ""}}>Approve offer</NavBtnLink>
                </NavBtn>
            </Column>
            }

            {item.status == "Picked" && isConfirmAllowed &&
            <Column>
                <NavBtn onClick={() => {confirmOffer(item)}}>
                    <NavBtnLink to = {{pathname: ""}}>Confirm offer</NavBtnLink>
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