import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import { InfoContainer, InfoWrapper, Title, FilterContainer, Filter, 
    FilterText, Select, Option, OrderContainer, EmptyView} from './BrowseElements';
import OrderDetail from './OrderDetail'

const BrowseOrders = () => {
    const [contract, setContract] = useState(null);
    const [initialOrders, setInitialOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const orderOwnerContext = React.createContext('orderOwner');

    const getAllSellers = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = "0xd181D7c2eF5cF4744fe079A4c89CB5D5CDB29853";
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);
        var allSellerAddress = contractObj.getAllSellers();
        var userAddr = ls.get('userAddr');
        const allUniqueAddresses = [];
        
        allSellerAddress.then(function(result){
            
            for(var i=0; i<result.length; i++){
                //console.log(result[i].buyer);
                if(result[i].toLowerCase() != userAddr.toLowerCase()){
                    if (!allUniqueAddresses.includes(result[i])) {
                         allUniqueAddresses.push(result[i]); 
                         showAllOrders(contractObj, allUniqueAddresses)
                    }
                }            
            }
        });
    }

    const showAllOrders = (contractObj, allUniqueAddresses) => {
        const allOrders = [];
        allUniqueAddresses.forEach(address => {
            var callPromise = contractObj.getOrders(address);
            callPromise.then(function(item){
                item.forEach(i => {
                    if (!allOrders.includes(i)) {
                        allOrders.push([address,i]);
                    }
                    //console.log(allOrders[address][i]);
                    var filtered = allOrders.filter(item => item.status == "active" || item.status == "Active")
                    console.log(filtered);
                    setInitialOrders(filtered);
                    setOrders(filtered);
                })
            });
       })
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
        } else {
            var filtered = initialOrders.filter(item => item.categories == 3)
            setOrders(filtered);
            console.log(filtered);
        }
      }

    useEffect(() => {
        getAllSellers();
      }, []);

    return (
        <InfoContainer>
            <InfoWrapper>
                <Title>Current orders</Title>
                <FilterContainer>
                    <Filter>
                        <FilterText>Filter by category: </FilterText>
                        <Select onChange={(event) => changeCategory(event.target.value)} 
        value = {currentCategory}>
                            <Option value = "0">all</Option>
                            <Option value = "1">Category 1</Option>
                            <Option value = "2">Category 2</Option>
                            <Option value = "3">Category 3</Option>
                        </Select>
                    </Filter>
                </FilterContainer>
                <OrderContainer>
                    {orders.map(item => (
                        <OrderDetail item = {item} />
                    ))}
                    <EmptyView/>
                </OrderContainer>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default BrowseOrders;