import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row} from './MakeOrderElements';


const MakeOrder = () => {
    const [contract, setContract ] = useState(null);
    const [nextOrderId, setNextOrderId ] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        handleContract();
      }, []);

    const handleContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = "0xdCD044fe2d67Baa6A1086a5e99471caCD7322b43";
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);

        var idRequest = contractObj.nextOrderID();
        idRequest.then(function(result) {
          console.log(parseFloat(result));
          setNextOrderId(parseFloat(result));
        });
    }

    const makeOrder = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        var name = data.get("name");
        var unit = data.get("unit");
        var categories = data.get("categories");
        var quantity = data.get("quantity");
        var expirationBlock = data.get("expirationBlock");
        var itemDescription = data.get("itemDescription");
        var condition = data.get("condition");
        var price = data.get("price");
        var location = data.get("location");

        var buyer = ls.get('userAddr');

        let myObj = {"orderId": nextOrderId, "name": name, "unit": unit, "categories": categories,
        "quantity": quantity, "expirationBlock": expirationBlock, "itemDescription": itemDescription, 
        "condition": condition, "price": price, "buyer": buyer, "location": location};
       
        var callPromise = contract.addOrder(myObj);
    
        callPromise.then(function(result){
        setSuccessMsg("Order is made!");
            console.log(result);
        });
  }

  return (
    <>
    <Container>
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOrder}>
              <FormH1>Make an order</FormH1>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Name</FormLabel>
                    <FormInput type = 'text' name = 'name' placeholder = "Name" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Unit</FormLabel>
                    <FormInput type = 'text' name = "unit" placeholder = "Unit" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Categories</FormLabel>
                    <FormInput type = 'number' name = "categories" placeholder = "Categories" required/>
                </Column>
              </Row>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Quantity</FormLabel>
                    <FormInput type = 'number' name = "quantity" placeholder = "Quantity" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Item Description</FormLabel>
                    <FormInput type = 'text' name = "itemDescription" placeholder = "Item Description" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Condition</FormLabel>
                    <FormInput type = 'number' name = "condition" placeholder = "Condition" required/>
                </Column>
              </Row>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Price</FormLabel>
                    <FormInput type = 'number' name = "price" placeholder = "Price" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Location</FormLabel>
                    <FormInput type = 'text' name = "location" placeholder = "Location" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Expiration Block</FormLabel>
                    <FormInput type = 'number' name = "expirationBlock" placeholder = "Expiration Block" required/>
                </Column>
              </Row>
              <FormButton type = 'submit'>order</FormButton>  
              <Text>{successMsg}</Text>
            </Form>
          </FormContent> 
        </FormWrap>
      </Container>
    </>
  )
}

export default MakeOrder;