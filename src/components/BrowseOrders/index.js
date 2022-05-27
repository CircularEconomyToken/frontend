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
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);
        var allSellerAddress = contractObj.getAllSellers();
        var userAddr = ls.get('userAddr');
        const allUniqueAddresses = [];
        
        allSellerAddress.then(function(result){
            
            for(var i=0; i<result.length; i++){
                if(result[i].toLowerCase() != userAddr.toLowerCase()){
                    if (!allUniqueAddresses.includes(result[i])) {
                         allUniqueAddresses.push(result[i]); 
                         showAllOrders(contractObj, allUniqueAddresses)
                    }
                }            
            }
        });
    }

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    const showAllOrders = (contractObj, allUniqueAddresses) => {
        const allOrders = [];
        allUniqueAddresses.forEach(address => {
            var callPromise = contractObj.getOrders(address);
            callPromise.then(function(item){
                item.forEach(i => {
                    if (!allOrders.includes(i)) {
                        var temp = clone(i);
                        temp["address"] = address;
                        allOrders.push(temp);
                    }
                    var filtered = allOrders.filter(item => item.status == "active" || item.status == "Active")
                    setInitialOrders(filtered);
                    setOrders(filtered);
                    console.log(filtered)
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
                            <Option value = "0">All categories</Option>
                            <Option value = "1">Construction</Option>
                            <Option value = "2">Furniture</Option>
                            <Option value = "3">Vehicle</Option>
                            <Option value = "4">Technology</Option>
                            <Option value = "5">Service</Option>
                            <Option value = "6">Electronics</Option>
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