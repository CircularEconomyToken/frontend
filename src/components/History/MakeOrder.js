import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {FormContainer, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row, FormTextArea, FormSelect, Option} from './MakeOrderElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
            toast.success("Order is placed!");
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
              <FormH1>Add new item!</FormH1>
              <Row>
                <Column> 
                    <TextField type = 'text' name = 'name' label = "Item name" fullWidth variant='standard' required/>
                </Column>
                <Column>
                <FormControl variant="standard" sx={{minWidth: 200 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Unit of Product </InputLabel>
                    <Select name="unit" label="Units" fullWidth required>
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={1}>Piece</MenuItem>
                      <MenuItem value={2}>KG</MenuItem>
                      <MenuItem value={3}>Ton</MenuItem>
                      <MenuItem value={4}>Meter</MenuItem>
                    </Select>
                </FormControl>  
                </Column>
                <Column>
                <FormControl variant="standard" sx={{minWidth: 200 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Condition </InputLabel>
                    <Select name="condition" label="Condition" fullWidth required>
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={1}>Brand new</MenuItem>
                      <MenuItem value={2}>Broken</MenuItem>
                      <MenuItem value={3}>Used</MenuItem>
                      <MenuItem value={4}>Vinted</MenuItem>
                      <MenuItem value={5}>Refurbished</MenuItem>
                    </Select>
                </FormControl> 
                </Column>
              </Row>
              <Row>
                <Column>
                    <TextField type = 'number' name = "quantity" min="1" label="Quantity" fullWidth variant='standard' required/>
                </Column>
                <Column>
                    <TextField type = 'text' name = 'location' label = "Location" fullWidth variant='standard' required/>
                </Column>
                <Column>
                <FormControl variant="standard" sx={{minWidth: 200 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Category </InputLabel>
                    <Select name="categories" label="Category" fullWidth required>
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={1}>Construction</MenuItem>
                      <MenuItem value={2}>Furniture</MenuItem>
                      <MenuItem value={3}>Vehicle</MenuItem>
                      <MenuItem value={4}>Technology</MenuItem>
                      <MenuItem value={5}>Service</MenuItem>
                      <MenuItem value={6}>Electronics</MenuItem>
                    </Select>
                </FormControl>
                </Column>
              </Row>
              <Row>
                <Column>
                  <TextField type = 'number' name = "price" min="0" label="Price" fullWidth variant='standard' required/>   
                </Column>
                
                <Column>
                  <TextField type = 'text' name = 'itemDescription' label = "Item Description" multiline maxRows={4} fullWidth variant='standard' required/>
                </Column>

                <Column>
                    <TextField type = 'number' name = "expirationBlock" min="1" label="Days of validity" fullWidth variant='standard' required/>            
                </Column>
              </Row>
              <FormButton type = 'submit'>Place order</FormButton>  
            </Form>
          </FormContent> 
        </FormWrap>
      </FormContainer>
    </>
  )
}

export default MakeOrder;