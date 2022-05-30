import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import { InfoContainer, InfoWrapper, Title, FilterContainer, Filter, 
    FilterText, Select, Option, OrderContainer, EmptyView, NavBtn, 
    NavBtnLink, Text } from './HistoryElements';
import Offer from './Offer'
import { useParams } from 'react-router-dom';

const OfferCard = () => {
    const [contract, setContract] = useState(null);
    const [initialOffers, setInitialOffers] = useState([]);
    const [offers, setOffers] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);

    const { id } = useParams();
    const { name } = useParams();

    const getOffers = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        //setContract(contractObj);
        
        var userAddr = ls.get('userAddr');
        var callPromise = contractObj.getOffers(userAddr, id);
        callPromise.then(function(result){
            console.log(result);
            var filtered = result.filter(item => item.status == "Active" || item.status == "active" || item.status == "Picked")
            setInitialOffers(filtered);
            setOffers(filtered);
        });
    }

    const changeCategory = (category) => {
        if (category == "0") {
            setOffers(initialOffers);
        } else if (category == "1") {
            var filtered = initialOffers.filter(item => item.status == "Picked")
            setOffers(filtered);
            console.log(filtered);
        } else {
            var filtered = initialOffers.filter(item => item.status == "Active" || item.status == "active")
            setOffers(filtered);
            console.log(filtered);
        }
      }

    useEffect(() => {
        getOffers();
      }, []);

    return (
        <InfoContainer>
            <InfoWrapper>
                <Title></Title>
                <FilterContainer>
                    <Filter>
                        <FilterText>View offers on your item: </FilterText>
                        <Select onChange={(event) => changeCategory(event.target.value)} 
        value = {currentCategory}>
                            <Option value = "0">All offers</Option>
                            <Option value = "1">Picked</Option>
                            <Option value = "2">Active</Option>
                        </Select>
                        
                    </Filter>
                </FilterContainer>
                <OrderContainer>
                    {offers.map((item, index) => (
                        <Offer item = {item} orderId = {id} offerId = {index} name = {name}/>
                    ))}
                    <EmptyView/>
                </OrderContainer>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default OfferCard;