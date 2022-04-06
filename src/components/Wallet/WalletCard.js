import React, { useState } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import {Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text} from './WalletElements';

const WalletCard = () => {

    const [errorMessage, setErrorMessage ] = useState(null);
    const [defaultAccount, setDefaultAccount ] = useState(null);
    const [userBalance, setUserBalance ] = useState(null);
    const [userAddress, setUserAddress ] = useState(null);
    const [contract, setContract ] = useState(null);
    const [nextOrderId, setNextOrderId ] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [contractSuccessMsg, setContractSuccessMsg] = useState(null);
    const [contractInfo, setContractInfo ] = useState({
        address: "-",
        tokenName: "-",
        tokenSymbol: "-",
        totalSupply: "-"
    });

    const connectWalletHandler = async (e) => {
       e.preventDefault();
        if (window.ethereum) { 
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]); 
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Hi Diko')
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        var privateKey = "eec05da571412f2911bfb3c7b8917ea7b1424c6d9a9815f5b6af06eabd7bd694";
        var wallet = new ethers.Wallet(privateKey, provider);
        var contractObj = new ethers.Contract(data.get("addr"), erc20abi, wallet);
        setContract(contractObj);

        var idRequest = contractObj.nextOrderID();
        idRequest.then(function(result){
          setContractSuccessMsg("Contract address is saved!")
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
      var buyer = data.get("buyer");
      var location = data.get("location");

    let myObj = {"orderId": nextOrderId, "name": name, "unit": unit, "categories": categories,
     "quantity": quantity, "expirationBlock": expirationBlock, "itemDescription": itemDescription, 
     "condition": condition, "price": price, "buyer": buyer, "location": location};

    console.log(myObj);
    var callPromise = contract.addOrder(myObj);
  
    callPromise.then(function(result){
       setSuccessMsg("Order is made!");
        console.log(result);
    });
  }

  const getOrders = async (e) => {
    
    var callPromise = contract.getOrders(userAddress);
    callPromise.then(function(result){
        console.log(result[0]);
    });
   // console.log(userAddress)
    
    // setContractInfo({
    //     address: data.get("addr"),
    //     tokenName,
    //     tokenSymbol,
    //     totalSupply
    // });
}

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        setUserAddress(address);
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    const chainChanged = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChanged);

    return (
      <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form action = '#' onSubmit={connectWalletHandler}>
              <FormH1>Connect to your wallet</FormH1>
              <FormButton >Connect</FormButton>
              <Text> Your address: { defaultAccount }</Text>
              <Text> Your balance: { userBalance }</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>

      <Container>
        <FormWrap>
          <FormContent>
            <Form action = '#' onSubmit={handleSubmit}>
              <FormH1>Link your contract address</FormH1>
              <FormLabel htmlFor = 'for'>Contract address</FormLabel>
              <FormInput type = 'text' name = "addr" placeholder = "ERC20 contract address" required/>
              <FormButton type = 'submit'>Continue</FormButton>
              <Text>{contractSuccessMsg}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>

      <Container>
        <FormWrap>
          <FormContent>
            <Form  onSubmit={makeOrder}>
              <FormH1>Make an order</FormH1>
              <FormLabel htmlFor = 'for'>Name</FormLabel>
              <FormInput type = 'text' name = 'name' placeholder = "Name" required/>
              <FormLabel htmlFor = 'for'>Unit</FormLabel>
              <FormInput type = 'text' name = "unit" placeholder = "Unit" required/>
              <FormLabel htmlFor = 'for'>Categories</FormLabel>
              <FormInput type = 'number' name = "categories" placeholder = "Categories" required/>
              <FormLabel htmlFor = 'for'>Quantity</FormLabel>
              <FormInput type = 'number' name = "quantity" placeholder = "Quantity" required/>
              <FormLabel htmlFor = 'for'>Expiration Block</FormLabel>
              <FormInput type = 'number' name = "expirationBlock" placeholder = "Expiration Block" required/>
              <FormLabel htmlFor = 'for'>Item Description</FormLabel>
              <FormInput type = 'text' name = "itemDescription" placeholder = "Item Description" required/>
              <FormLabel htmlFor = 'for'>Condition</FormLabel>
              <FormInput type = 'number' name = "condition" placeholder = "Condition" required/>
              <FormLabel htmlFor = 'for'>Price</FormLabel>
              <FormInput type = 'number' name = "price" placeholder = "Price" required/>
              <FormLabel htmlFor = 'for'>Buyer Address</FormLabel>
              <FormInput type = 'text' name = "buyer" placeholder = "Buyer Address" required/>
              <FormLabel htmlFor = 'for'>Location</FormLabel>
              <FormInput type = 'text' name = "location" placeholder = "Location" required/>
              <FormButton type = 'submit'>order</FormButton>  
              <Text>{successMsg}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
        </>
    )
}

export default WalletCard;