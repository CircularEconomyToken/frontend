import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {MainContainer, MainBg, Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, Text} from './WalletElements';
import image from '../../images/etherium_image.png'

const WalletCard = () => {
    const [disable, setDisable] = useState(false);
    const [successMsg, setSuccessMsg] = useState("Please connect to Metamask wallet");
    const [errorMessage, setErrorMessage ] = useState(null);
    const [defaultAccount, setDefaultAccount ] = useState(null);
    const [userBalance, setUserBalance ] = useState(null);
    const [contractInfo, setContractInfo ] = useState({
        address: "-",
        tokenName: "-",
        tokenSymbol: "-",
        totalSupply: "-"
    });

    useEffect(() => {
      checkWalletConnection();
    }, [])

    const connectWalletHandler = async (e) => {
       e.preventDefault();
        if (window.ethereum) { 
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]); 
                ls.set('userAddr', result[0].toString());
                ls.set('contractAddr', "0x9A4EF53D3348C3FCEFad1490a329602DC52Ab040");
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
              setSuccessMsg("Please connect to the MetaMask wallet");
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

    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChanged);

    return (
      <>
      <MainContainer>
        <MainBg style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", 
    
    }}></MainBg>
      <Container>
        <FormWrap>
          <FormContent>
            <Form action = '#' onSubmit={connectWalletHandler}>
              <Text>{successMsg}{errorMessage}</Text>
              <Text></Text>
              <FormButton color ='#01bf71' disabled={disable}>Connect</FormButton>
              <Text>If you have multiple accounts, you can switch account in the Metamask wallet</Text>
              {/*<Text> Your address: { defaultAccount }</Text>
              <Text> Your balance: { userBalance }</Text>*/}
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
      </MainContainer>
        </>
    )
}

export default WalletCard;