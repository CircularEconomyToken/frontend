import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import { InfoContainer, InfoWrapper, Title, FilterContainer, Filter, 
    FilterText, Select, Option, OrderContainer, EmptyView, NavBtn, 
    NavBtnLink } from './HistoryElements';
import Order from './Order'

const HistoryCard = () => {
    const [contract, setContract] = useState(null);
    const [initialOrders, setInitialOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);

    const getOrders = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);
        
        var userAddr = ls.get('userAddr');
        var callPromise = contractObj.getOrders(userAddr);
        callPromise.then(function(result) {
            console.log(userAddr);
            var filtered = result.filter(item => item.status == "Active" || item.status == "active")
            setInitialOrders(filtered);
            setOrders(filtered);
        });
    }

    const changeCategory = (category) => {
        if (category == "0") {
            setOrders(initialOrders);
        } else if (category == "1") {
            var filtered = initialOrders.filter(item => item.categories == 1)
            setOrders(filtered);
            console.log(filtered);
        } else if (category == "2") {
            var filtered = initialOrders.filter(item => item.categories == 2)
            setOrders(filtered);
            console.log(filtered);
        } else if (category == "3") {
            var filtered = initialOrders.filter(item => item.categories == 3)
            setOrders(filtered);
            console.log(filtered);
        } else if (category == "4") {
            var filtered = initialOrders.filter(item => item.categories == 4)
            setOrders(filtered);
            console.log(filtered);
        } else if (category == "5") {
            var filtered = initialOrders.filter(item => item.categories == 5)
            setOrders(filtered);
            console.log(filtered);
        } else {
            var filtered = initialOrders.filter(item => item.categories == 6)
            setOrders(filtered);
            console.log(filtered);
        }
      }

    useEffect(() => {
        getOrders();
      }, []);

    return (
        <InfoContainer>
            <InfoWrapper>
                <Title>History of orders</Title>
                <FilterContainer>
                    <Filter>
                        <FilterText>Filter by category: </FilterText>
                        <Select onChange={(event) => changeCategory(event.target.value)} 
        value = {currentCategory}>
                            <Option value = "0">all</Option>
                            <Option value = "1">Construction</Option>
                            <Option value = "2">Furniture</Option>
                            <Option value = "3">Vehicle</Option>
                            <Option value = "4">Technology</Option>
                            <Option value = "5">Service</Option>
                            <Option value = "6">Electronics</Option>
                        </Select>
                        <NavBtn>
                            <NavBtnLink to = '/makeOrder'>Add good/service</NavBtnLink>
                        </NavBtn>
                    </Filter>
                </FilterContainer>
                <OrderContainer>
                    {orders.map(item => (
                        <Order item = {item} />
                    ))}
                    <EmptyView/>
                </OrderContainer>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default HistoryCard;