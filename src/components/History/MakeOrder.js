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
        var privateKey = "eec05da571412f2911bfb3c7b8917ea7b1424c6d9a9815f5b6af06eabd7bd694";
        var contractAddr = "0xdCD044fe2d67Baa6A1086a5e99471caCD7322b43";
        var wallet = new ethers.Wallet(privateKey, provider);
        var contractObj = new ethers.Contract(contractAddr, erc20abi, wallet);
        setContract(contractObj);

        var idRequest = contractObj.nextOrderID();
        idRequest.then(function(result) {
          console.log(parseFloat(result));
          setNextOrderId(parseFloat(result));
        });
    }

    const sendTransaction = () => {
        var obj = [25, "matrass", "one", 2, 7,2,"sandy",3,20,"0xC73164F00465bdc958c25d3d06B87D5DBECa3c5D","ddd"]
       // var data = "0x417772cf
       //0000000000000000000000000000000000000000000000000000000000000020 1
       //0000000000000000000000000000000000000000000000000000000000000019 2
       //0000000000000000000000000000000000000000000000000000000000000160 3
       //00000000000000000000000000000000000000000000000000000000000001a0 4
       //0000000000000000000000000000000000000000000000000000000000000002 5
       //0000000000000000000000000000000000000000000000000000000000000007 6
       //0000000000000000000000000000000000000000000000000000000000000002 7
       //00000000000000000000000000000000000000000000000000000000000001e0 8
       //0000000000000000000000000000000000000000000000000000000000000003 9
       //0000000000000000000000000000000000000000000000000000000000000014 10
       //000000000000000000000000c73164f00465bdc958c25d3d06b87d5dbeca3c5d 11
       //0000000000000000000000000000000000000000000000000000000000000220 12
       //0000000000000000000000000000000000000000000000000000000000000007 13
       //6d61747261737300000000000000000000000000000000000000000000000000 14
       //0000000000000000000000000000000000000000000000000000000000000003 15
       //6f6e650000000000000000000000000000000000000000000000000000000000 16
       //0000000000000000000000000000000000000000000000000000000000000005 17
       //73616e6479000000000000000000000000000000000000000000000000000000 18
       //0000000000000000000000000000000000000000000000000000000000000003 19
       //6464640000000000000000000000000000000000000000000000000000000000"; 20
        var params = [{
            "from": "0xC73164F00465bdc958c25d3d06B87D5DBECa3c5D",
            "to": "0xdCD044fe2d67Baa6A1086a5e99471caCD7322b43",
            "gas": "3999999999000",
            "gasPrice": "4.3635",
            "value": "100000",
            "data": "lol"
        }]
        window.ethereum.request({method: 'eth_sendTransaction', params})
        .then(result => {
            console.log(result);
        })
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
       // sendTransaction()
       
        console.log(myObj);
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