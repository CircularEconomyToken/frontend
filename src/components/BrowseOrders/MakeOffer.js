import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row, FormTextArea} from './MakeOfferElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';


const MakeOffer = () => {
    const [contract, setContract ] = useState(null);
    const [result, setOrderInfo] = useState({});
    //const [field, setValue] = useState(null);

    useEffect(() => {
        handleContract();
        getOrderInfo();
      }, []);

    const { id } = useParams();
    const { address } = useParams();

    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
      resolver: yupResolver()
    });

    const handleContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var contractAddr = ls.get('contractAddr');
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
        var status = "Active";
        var orderId = id;
        var orderOwner = address;

        let offerObj = {"price": price, "usecase": usecase, "earliestBlock": earliestBlock,
        "_address": userAddress, "status": status}; 
       
        var callPromise = contract.addOffer(offerObj, orderOwner, orderId);
    
        callPromise.then(function(result){
            console.log(result);
            toast.success("Offer is made!");
            setTimeout(function() {
              window.location='/offerHistory'
            }, 5000);
        });
  }


  const getOrderInfo = async (e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var contractAddr = ls.get('contractAddr');
    const signer = provider.getSigner();
    var contractObj = new ethers.Contract(contractAddr, erc20abi, signer);
    setContract(contractObj);
    var orderOwner = address;
    
    var callPromise = contractObj.getOrder(orderOwner, id);
    callPromise.then(function (result) {
      const fields = ['name', 'unit', 'categories', 'quantity', 'itemDescription', 'condition', 'price', 'location', 'expirationBlock'];
      fields.forEach(field => setValue(field, result[field]));
      setOrderInfo(result);
      console.log(result);
    });
  }

  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} 
    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <Container>
        
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOffer}>
            <FormH1>Make an offer</FormH1>

            <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Offer Price</FormLabel>
                    <FormInput type = 'number' name = "price" min="0" placeholder = "Price" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Use Case</FormLabel>
                    <FormTextArea type = 'text' name = "usecase" placeholder = "Usecase" required/>
                </Column>
                <Column>
                    <FormLabel htmlFor = 'for'>Earliest Day of Pick Up</FormLabel>
                    <FormInput type = 'number' name = "earliestBlock" min="1" placeholder = "Number of days" required/>
                </Column>
              </Row>

            <Row>
                <Column>
                  <FormLabel htmlFor='for'>Product name</FormLabel>
                  <FormInput type='text' name='name' value={result.name || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Unit</FormLabel>
                  <FormInput type='text' name='unit' value={result.unit || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Categories</FormLabel>
                  <FormInput type='number' name='categories' value={result.categories || ''} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <FormLabel htmlFor='for'>Quantity</FormLabel>
                  <FormInput type='number' name='quantity' value={result.quantity || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Item Description</FormLabel>
                  <FormInput type='text' name='itemDescription'value={result.itemDescription || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Condition</FormLabel>
                  <FormInput type='number' name='condition' value={result.condition || ''} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <FormLabel htmlFor='for'>Order Price</FormLabel>
                  <FormInput type='number' name='price' value={result.price || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Location</FormLabel>
                  <FormInput type='text' name='location' value={result.location || ''} />
                </Column>
                <Column>
                  <FormLabel htmlFor='for'>Expiration Block</FormLabel>
                  <FormInput type='number' name='expirationBlock' value={result.expirationBlock || ''} />
                </Column>
                </Row>
              
          

              
              
              
              <FormButton type = 'submit'>Confirm Offer</FormButton> 
              

            </Form>
          </FormContent> 
        </FormWrap>
      </Container>
    </>
  );
  //}
}


export default MakeOffer;