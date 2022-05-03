import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row} from './MakeOfferElements';

const {orderID} = require('./OrderDetail.js');
const {productName} = require('./OrderDetail.js');
//const {orderOwner} = require('./OrderDetail.js');


const MakeOffer = () => {
    const [contract, setContract ] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        handleContract();
      }, []);

    const handleContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = "0xd181D7c2eF5cF4744fe079A4c89CB5D5CDB29853";
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);

        
    }

    const makeOffer = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        
        var price = data.get("price");
        var usecase = data.get("usecase");
        var earliestBlock = data.get("earliestBlock");
        var userAddress = ls.get('userAddr');
        var status = "active";

        let offerObj = {"price": price, "usecase": usecase, "earliestBlock": earliestBlock,
        "_address": userAddress, "status": status};
       
        /*var callPromise = contract.addOffer(offerObj, orderOwner, orderId);
    
        callPromise.then(function(result){
        setSuccessMsg("Offer is made!");
            console.log(result);
        });*/
  }

  return (
    <>
    <Container>
    
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOffer}>
              <Row>
              <Column>
                <Text> Product Name: </Text>
              </Column>
              </Row>
              <FormH1>Make an offer</FormH1>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Price</FormLabel>
                    <FormInput type = 'number' name = "price" placeholder = "Price" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Use Case</FormLabel>
                    <FormInput type = 'text' name = "usecase" placeholder = "Usecase" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Earliest Block</FormLabel>
                    <FormInput type = 'text' name = "earliestBlock" placeholder = "Earliest Block" required/>
                </Column>
              </Row>
              <FormButton type = 'submit'>Confirm Offer</FormButton>  
              <Text>{successMsg}</Text>
            </Form>
          </FormContent> 
        </FormWrap>
      </Container>
    </>
  )
}

export default MakeOffer;