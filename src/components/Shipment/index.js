import React, { useState, useEffect } from 'react';
import {Button} from '../ButtonElements';
import {InfoContainer, InfoWrapper, InfoRow, Column1, Column2, 
    TextWrapper, Heading, BtnWrap, ImgWrap, EmptyView,
    Img, FormLabel, FormInput, Row, NavBtn, NavBtnLink }from './ShipmentElements'
import ls from 'local-storage'
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';

function Shipment({
    primary,
    dark,
    dark2
}) {

    const [orderName, setOrderName] = useState(ls.get('orderName'));
    const [orderPrice, setOrderPrice] = useState(ls.get('orderPrice'));
    const [orderQuantity, setOrderQuantity] = useState(ls.get('orderQuantity'));
    const [orderLocation, setOrderLocation] = useState(ls.get('orderLocation'));
    const [orderCondition, setOrderCondition] = useState(ls.get('orderCondition'));
    const [orderUnit, setOrderUnit] = useState(ls.get('orderUnit'));
    const [orderDescription, setOrderDescription] = useState(ls.get('orderDescription'));
    const [orderCategory, setOrderCategory] = useState(ls.get('orderCategory'));
    const [offerPrice, setOfferPrice] = useState(ls.get('offerPrice'));
    const [offerUsecase, setOfferUsecase] = useState(ls.get('offerUsecase'));
    const [successMsg, setSuccessMsg] = useState(null);

    const { orderOwnerAddress } = useParams();
    const { orderId } = useParams();
    const { offerId } = useParams();

    const confirmShipment = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        var callPromise = contractObj.confirmShipment(orderOwnerAddress, orderId, offerId);
        callPromise.then(function(result) {
            setSuccessMsg("Shipment is confirmed!");
            console.log(result);
        });
    }
  
  return (
    <>
    <InfoContainer > 
        <InfoWrapper>
            <InfoRow >
                <Column1>
                <TextWrapper>
                    <Row>
                    <Heading lightText = 'false'>Shipment details</Heading>
                    <FormLabel htmlFor = 'for'>Your order: {orderName}</FormLabel>
                    <FormLabel htmlFor = 'for'>Category: {orderCategory}</FormLabel>
                    <FormLabel htmlFor = 'for'>Condition: {orderCondition}</FormLabel>
                    <FormLabel htmlFor = 'for'>Price: {orderPrice}</FormLabel>
                    <FormLabel htmlFor = 'for'>Quantity: {orderQuantity} {orderUnit}</FormLabel>
                    <FormLabel htmlFor = 'for'>Location: {orderLocation}</FormLabel>
                    <FormLabel htmlFor = 'for'>Your offered price: {offerPrice}</FormLabel>
                    <EmptyView/>
                    <FormLabel>{successMsg}</FormLabel>
                    <NavBtn onClick={() => {confirmShipment()}}>
                        <NavBtnLink to = '' 
                        smooth = {true}
                        duration = {500}
                        spy = {true}
                        exact = {true}
                        offset = {-80}
                        primary = {primary ? 1 : 0}
                        dark = {dark ? 1 : 0}
                        dark2 = {dark2 ? 1 : 0}
                        >Buy</NavBtnLink>
                    </NavBtn>
                    </Row>
                </TextWrapper>
                </Column1>
                <Column2>
                    <ImgWrap>
                        <Img src = {require('../../images/svg-2.svg').default} alt = "shipment"/>
                    </ImgWrap>
                </Column2>
            </InfoRow>
        </InfoWrapper>
    </InfoContainer>
    </>
  );
}

export default Shipment;