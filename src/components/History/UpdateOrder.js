import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {
  FormContainer, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput,
  FormButton, Text, Column, Row
} from './MakeOrderElements';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateOrder = () => {

  const [result, setOrderInfo] = useState({});
  const [contract, setContract] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

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
      setSuccessMsg("Order is updated!");
      console.log(result);
    });
  }

  return (
    <>
      <FormContainer>
        <FormWrap>
          <FormContent>
            <Form onSubmit={updateOrder} onReset={reset}>
              <FormH1>Update this order</FormH1>
              <Row>
                <Column>
                  <FormLabel htmlFor='for'>Name</FormLabel>
                  <FormInput type='text' name='name' onChange={(event) => {
                    setOrderInfo({ ...result, name: event.target.value });
                  }}
                    required value={result.name || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Unit</FormLabel>
                  <FormInput type='text' name='unit' onChange={(event) => {
                    setOrderInfo({ ...result, unit: event.target.value });
                  }}
                    required value={result.unit || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Categories</FormLabel>
                  <FormInput type='number' name='categories' onChange={(event) => {
                    setOrderInfo({ ...result, categories: event.target.value });
                  }}
                    required value={result.categories || ''} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <FormLabel htmlFor='for'>Quantity</FormLabel>
                  <FormInput type='number' name='quantity' onChange={(event) => {
                    setOrderInfo({ ...result, quantity: event.target.value });
                  }}
                    required value={result.quantity || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Item Description</FormLabel>
                  <FormInput type='text' name='itemDescription' onChange={(event) => {
                    setOrderInfo({ ...result, itemDescription: event.target.value });
                  }}
                    required value={result.itemDescription || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Condition</FormLabel>
                  <FormInput type='number' name='condition' onChange={(event) => {
                    setOrderInfo({ ...result, condition: event.target.value });
                  }}
                    required value={result.condition || ''} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <FormLabel htmlFor='for'>Price</FormLabel>
                  <FormInput type='number' name='price' onChange={(event) => {
                    setOrderInfo({ ...result, price: event.target.value });
                  }}
                    required value={result.price || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Location</FormLabel>
                  <FormInput type='text' name='location' onChange={(event) => {
                    setOrderInfo({ ...result, location: event.target.value });
                  }}
                    required value={result.location || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Expiration Block</FormLabel>
                  <FormInput type='number' name='expirationBlock' onChange={(event) => {
                    setOrderInfo({ ...result, expirationBlock: event.target.value });
                  }}
                    required value={result.expirationBlock || ''} />
                </Column>
              </Row>
              <FormButton type='submit'>Confirm update</FormButton>
              <Text>{successMsg}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </FormContainer>
    </>
  )
}

export default UpdateOrder;