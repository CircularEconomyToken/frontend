import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import { Container, Image, Column, TitleText, Text, IconColumn, IconLink, NavBtn, NavBtnLink} from './OrderElements';
import ls from 'local-storage';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = ({item}) => {

    const [orders, setOrders] = useState([]);    
    const [contract, setContract] = useState(null);
    const [buttonText, setText] = useState("No offer yet");

    const getOffers = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        //setContract(contractObj);
        
        var userAddr = ls.get('userAddr');
        var callPromise = contractObj.getOffers(userAddr, item.orderId);
        callPromise.then(function(result){
            //console.log(result);
            setOrders(result);
            if (result.length != 0) setText("View offers "+ "(" + result.length + ")");
            else setText("No offer yet");
        });   
    }

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
            toast.success("Order is deleted!");
            console.log(result);
            setTimeout(function() {
                window.location='/history'
              }, 4000);
        });
    }

    useEffect(() => {
        getOffers();
      }, []);

    return (
        <Container>
            <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} 
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>

            <Image src = {require('../../images/package.png')}/> 

            <Column>
                <TitleText> Item name </TitleText>
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
                <Text> {item.price.toString()}€</Text>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {(orders.length == 0)? {pathname: ""}: {pathname: `/viewOffers/${(item.name)}/${item.orderId}`}}>
                     {buttonText} </NavBtnLink>
                </NavBtn>
            </Column>


            <IconColumn> 
                <IconLink to={{pathname: ""}}>
                    <DeleteIcon style={{ color: '#01bf71' }} onClick={() => {deleteOrder(item.orderId)}}/>
                </IconLink>
            </IconColumn>

            <IconColumn> 
                <IconLink to = {{pathname: `/updateOrder/${item.orderId}`}}>
                    <UpdateIcon style={{ color: '#01bf71' }} />
                </IconLink>     
            </IconColumn>
            
        </Container>
    )
}

export default Order;