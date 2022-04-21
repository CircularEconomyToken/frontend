import React, { useState } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text} from './WalletElements';

const WalletCard = () => {

    const [errorMessage, setErrorMessage ] = useState(null);
    const [defaultAccount, setDefaultAccount ] = useState(null);
    const [userBalance, setUserBalance ] = useState(null);
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
                ls.set('userAddr', result[0].toString());
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
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
        </>
    )
}

export default WalletCard;