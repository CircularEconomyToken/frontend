import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {
  FormContainer, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput,
  FormButton, NavBtnLink, Column, Row, NavBtn
} from './MakeOrderElements';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import image from '../../images/etherium_image.png'
import {MainContainer, MainBg} from '../Wallet/WalletElements'

const UpdateOrder = () => {

  const [result, setOrderInfo] = useState({});
  const [contract, setContract] = useState(null);

  useEffect(() => {
    getOrderInfo();
    console.log(result);
  }, []);

  const { id } = useParams();

  const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
    resolver: yupResolver()
  });

  const getOrderInfo = async (e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var contractAddr = ls.get('contractAddr');
    const signer = provider.getSigner();
    var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
    setContract(contractObj);

    var userAddr = ls.get('userAddr');
    var callPromise = contractObj.getOrder(userAddr, id);
    callPromise.then(function (result) {
      const fields = ['name', 'unit', 'categories', 'quantity', 'itemDescription', 'condition', 'price', 'location', 'expirationBlock'];
      fields.forEach(field => setValue(field, result[field]));
      setOrderInfo(result);
      console.log(result);
    });
  }

  const updateOrder = async (e) => {
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

    let myObj = {
      "orderId": id, "name": name, "unit": unit, "categories": categories,
      "quantity": quantity, "expirationBlock": expirationBlock, "itemDescription": itemDescription,
      "condition": condition, "price": price, "buyer": buyer, "location": location, "status"
        : "active"
    };

    var callPromise = contract.updateOrder(myObj);

    callPromise.then(function (result) {
      toast.success("Order is updated!");
      console.log(result);
      setTimeout(function() {
        window.location='/history'
      }, 5000);
    });
  }

  return (
    <>
    <MainContainer>
        <MainBg style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></MainBg>
    <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} 
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <FormContainer>
        <FormWrap>
          <FormContent>
            <Form onSubmit={updateOrder} onReset={reset}>
              <FormH1>Update this order</FormH1>
              <Row>
                <Column>
                  <TextField type = 'text' name = 'name' label = "Item name" fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, name: event.target.value });
                  }}
                    required value={result.name || ''} />
                </Column>
                <Column>
                <FormControl variant="standard" sx={{minWidth: 200 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Unit of Product </InputLabel>
                    <Select name="unit" label="Units" fullWidth onChange={(event) => {
                    setOrderInfo({ ...result, unit: event.target.value });
                  }}
                    required value={result.unit || ''}>
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
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Category </InputLabel>
                      <Select name="categories" label="Category" fullWidth onChange={(event) => {
                    setOrderInfo({ ...result, categories: event.target.value });
                  }}
                    required value={result.categories || ''}>
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
                <TextField type = 'number' name = "quantity" min="1" label="Quantity" fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, quantity: event.target.value });
                  }}
                    required value={result.quantity || ''} />
                </Column>
                <Column>
                  <TextField type = 'text' name = 'itemDescription' label = "Item Description" multiline maxRows={4} fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, itemDescription: event.target.value });
                  }}
                    required value={result.itemDescription || ''} />
                </Column>
                <Column>
                  <FormControl variant="standard" sx={{minWidth: 200 }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" required> Condition </InputLabel>
                      <Select name="condition" label="Condition" fullWidth onChange={(event) => {
                    setOrderInfo({ ...result, condition: event.target.value });
                  }}
                    required value={result.condition || ''}>
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
                  <TextField type = 'number' name = "price" min="0" label="Price" fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, price: event.target.value });
                  }}
                    required value={result.price || ''} />
                </Column>
                <Column>
                  <TextField type = 'text' name = 'location' label = "Location" fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, location: event.target.value });
                  }}
                    required value={result.location || ''} />
                </Column>
                <Column>
                  <TextField type = 'number' name = "expirationBlock" min="1" label="Days of validity" fullWidth variant='standard' onChange={(event) => {
                    setOrderInfo({ ...result, expirationBlock: event.target.value });
                  }}
                    required value={result.expirationBlock || ''} />
                </Column>
              </Row>
              
              <Row>
                <Column>
                <FormButton>
                <NavBtnLink to = '/history'>Cancel</NavBtnLink>
                </FormButton>
                
                </Column>
                
                <Column>
                <FormButton type='submit'> Update</FormButton>
                </Column>
              </Row>

            </Form>
          </FormContent>
        </FormWrap>
      </FormContainer>
      </MainContainer>
    </>
  )
}

export default UpdateOrder;