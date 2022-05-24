import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row, FormTextArea} from './MakeOfferElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    

const MakeOffer = () => {
    const [contract, setContract ] = useState(null);

    useEffect(() => {
        handleContract();
      }, []);

    const { id } = useParams();
    const { address } = useParams();

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

  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} 
    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <Container>
    
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOffer}>
              <Row>
              <Column>
                
              </Column>
              </Row>
              <FormH1>Make an offer</FormH1>
              <Row>
                <Column>
                    <FormLabel htmlFor = 'for'>Price</FormLabel>
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