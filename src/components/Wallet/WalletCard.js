import React, { useState } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text} from './WalletElements';

const WalletCard = () => {
    const [disable, setDisable] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
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
                ls.set('contractAddr', "0x1bEF998c97E2dd4b1A1F1579c94C8098D1FABAA7");
                setDisable(true);
                setSuccessMsg("Connected to the wallet successfully!");
            })
        } else {
            setErrorMessage('Install MetaMask');
        }
    }

    const accountChangedHandler = (newAccount) => {
          setDefaultAccount(newAccount);
          ls.set('userAddr', newAccount.toString());
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

    const checkWalletConnection = async (e) => {
        if (window.ethereum) { 
          window.ethereum.request({ method: 'eth_accounts' }).then(result => {
            if (result.length === 0) { // MetaMask is locked or the user has not connected any accounts
              setDisable(false);
              setSuccessMsg("Please connect to MetaMask wallet");
            }
            else {
              setDisable(true);
              setSuccessMsg("You are connected to the wallet!");
            }
        })
        } else {
            setErrorMessage('Not connected with ethereum');
        }
    }  

    checkWalletConnection();
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChanged);

    return (
      <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form action = '#' onSubmit={connectWalletHandler}>
              <FormH1>Connect to your wallet</FormH1>
              <FormButton color ='#01bf71' disabled={disable}>Connect</FormButton>
              <Text>{successMsg}{errorMessage}</Text>
              {/*<Text> Your address: { defaultAccount }</Text>
              <Text> Your balance: { userBalance }</Text>*/}
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
        </>
    )
}

export default WalletCard;