import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {FormContainer, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row, FormTextArea, FormSelect, Option} from './MakeOrderElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { label: "Construction", value: 1 },
  { label: "Furniture", value: 2 },
  { label: "Vehicle", value: 3 },
  { label: "Technology", value: 4 },
  { label: "Service", value: 5 },
  { label: "Electronics", value: 6 },
];

const MakeOrder = () => {
    const [contract, setContract ] = useState(null);
    const [nextOrderId, setNextOrderId ] = useState(null);

    useEffect(() => {
        handleContract();
      }, []);

    const handleContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
        const signer = provider.getSigner();
        var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
        setContract(contractObj);
        
        var idRequest = contractObj.nextOrderID(ls.get('userAddr'));
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
        var buyer = "0x0000000000000000000000000000000000000000";
        var status = "Active";

        let myObj = {"orderId": nextOrderId, "name": name, "unit": unit, "categories": categories,
        "quantity": quantity, "expirationBlock": expirationBlock, "itemDescription": itemDescription, 
        "condition": condition, "price": price, "buyer": buyer, "location": location, "status": status};
       
        var callPromise = contract.addOrder(myObj);
    
        callPromise.then(function(result){
            console.log(result);
            toast.success("Order is made!");
            setTimeout(function() {
              window.location='/history'
            }, 5000);
        });
  }

  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} 
    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <FormContainer>
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOrder}>
              <FormH1>Add a Good/Service</FormH1>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Product Name</FormLabel>
                    <FormInput type = 'text' name = 'name' placeholder = "Name" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Unit of Product </FormLabel>
                    <FormSelect name = "unit" placeholder = "Units" required>
                          <Option value = "0">Select Unit </Option>
                          <Option value = "1">Piece </Option>
                          <Option value = "2">KG </Option>
                          <Option value = "3">Ton </Option>
                          <Option value = "4">Meter </Option>
                    </FormSelect>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Condition</FormLabel>
                    <FormSelect name = "condition" placeholder = "Condition" required>
                          <Option value = "0">Select Condition </Option>
                          <Option value = "1">Brand new </Option>
                          <Option value = "2">Broken </Option>
                          <Option value = "3">Used </Option>
                          <Option value = "4">Vinted </Option>
                          <Option value = "5">Refurbished </Option>
                    </FormSelect>
                </Column>
              </Row>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Quantity</FormLabel>
                    <FormInput type = 'number' name = "quantity" min="1" placeholder = "Quantity" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Location</FormLabel>
                    <FormInput type = 'text' name = "location" placeholder = "Location" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Category</FormLabel>
                    <FormSelect name = "categories" placeholder = "Categories" required>
                          <Option value = "0">Select Category </Option>
                          <Option value = "1">Construction</Option>
                          <Option value = "2">Furniture</Option>
                          <Option value = "3">Vehicle</Option>
                          <Option value = "4">Technology</Option>
                          <Option value = "5">Service</Option>
                          <Option value = "6">Electronics</Option>
                    </FormSelect>
                </Column>
              </Row>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Price</FormLabel>
                    <FormInput type = 'number' name = "price" min="0" placeholder = "Price" required/>
                </Column>
                
                <Column>
                    <FormLabel htmlFor = 'for'>Item Description</FormLabel>
                    <FormTextArea type = 'text' name = "itemDescription" placeholder = "Item Description" required/>
                </Column>

                <Column>
                    <FormLabel htmlFor = 'for'>Offer Expires </FormLabel>
                    <FormInput type = 'number' name = "expirationBlock" min="1" placeholder = "Number of days" required/>
                </Column>
              </Row>
              <FormButton type = 'submit'>Add</FormButton>  
            </Form>
          </FormContent> 
        </FormWrap>
      </FormContainer>
    </>
  )
}

export default MakeOrder;