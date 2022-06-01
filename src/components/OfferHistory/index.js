import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import { InfoContainer, InfoWrapper, Title, FilterContainer, Filter, 
    FilterText, Select, Option, OrderContainer, EmptyView, NavBtn, 
    NavBtnLink } from './OfferHistoryElements';
import OfferDetail from './OfferDetail'

const OfferHistoryCard = () => {
    const [contract, setContract] = useState(null);
    const [initialOffers, setinitialOffers] = useState([]);
    const [offers, setOffers] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const allOffers = [];

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

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
                         getOffers(contractObj, allUniqueAddresses);
                    }
                }            
            }
        });
    }

    const getOffers = (contractObj, allUniqueAddresses) => {
        
        allUniqueAddresses.forEach(address => {
            var callPromise = contractObj.getOrders(address);
            callPromise.then(function(result){
                var filtered = result.filter(item => item.status == "Active" || item.status == "active")
                filtered.map( order => {
                    var orderId = parseFloat(order.orderId);
                    var userAddr = ls.get('userAddr');
                    var offerPromise = contractObj.getOffers(address, orderId);
                    offerPromise.then(function(offerResult){
                        var filteredOffers = offerResult.filter(item => item.status == "Active" || item.status == "active" || item.status == "Picked")
                        filteredOffers.forEach((item, index) => {
                            if (!allOffers.includes(item) && item._address.toLowerCase() === userAddr.toLowerCase()) {
                                var temp = clone(item);
                                temp["orderId"] = orderId;
                                temp["orderName"] = order.name.toString();
                                temp["orderPrice"] = order.price.toString();
                                temp["orderQuantity"] = order.quantity.toString();
                                temp["orderLocation"] = order.location.toString();
                                temp["orderCondition"] = order.condition.toString();
                                temp["orderUnit"] = order.unit.toString();
                                temp["orderDescription"] = order.itemDescription.toString();
                                temp["orderCategory"] = order.categories.toString();
                                temp["offerId"] = index;
                                temp["orderOwnerAddress"] = address;
                                allOffers.push(temp);
                                //console.log(allOffers);
                                showAllOffers(allOffers);
                            }
                        })
                    });
                }
                )
            });
        });
    }

    const showAllOffers = (listOfOffers) => {
        setinitialOffers(listOfOffers);
        setOffers(listOfOffers);
        //console.log(initialOffers);
    }

    const changeCategory = (category) => {
        if (category == "0") {
            // console.log(initialOffers);
            setOffers(initialOffers);
        } else if (category == "1") {
            var filtered = initialOffers.filter(item => item.status == "Picked")
            setOffers(filtered);
            //console.log(filtered);
        } else {
            var filtered = initialOffers.filter(item => item.status == "Active" || item.status == "active")
            setOffers(filtered);
            //sconsole.log(filtered);
        }
      }

    useEffect(() => {
        getAllSellers();
      }, []);

    return (
        <InfoContainer>
            <InfoWrapper>
                <Title></Title>
                <FilterContainer>
                    <Filter>
                    <FilterText>Check out history of your offers! </FilterText>
                        <Select onChange={(event) => changeCategory(event.target.value)} 
        value = {currentCategory}>
                            <Option value = "0">All offers</Option>
                            <Option value = "1">Picked offers</Option>
                            <Option value = "2">Active offers</Option>
                        </Select>
                    </Filter>
                </FilterContainer>
                <OrderContainer>
                    {offers.map(item => (
                        <OfferDetail item = {item} />
                    ))}
                    <EmptyView/>
                </OrderContainer>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default OfferHistoryCard;