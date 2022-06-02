import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';
import erc20abi from '../../erc20abi.json';
import ls from 'local-storage'
import {Container, FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, 
    FormButton, Text, Column, Row, FormTextArea} from './MakeOfferElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import image from '../../images/etherium_image.png'
import {MainContainer, MainBg} from '../Wallet/WalletElements'

const MakeOffer = () => {
    const [contract, setContract ] = useState(null);
    const [result, setOrderInfo] = useState({});
    const [category, setCategoryValue] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [unit, setUnit] = useState(null);
    const [condition, setCondition] = useState(null);
    const [expirationBlock, setExpiration] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        handleContract();
        getOrderInfo();
      }, []);

    const { id } = useParams();
    const { address } = useParams();

    const getUnit = (category) => {
      if (category === "1") return  "Piece";
      else if (category === "2") return  "KG";
      else if (category === "3") return  "Ton";
      else return  "Meter";
  }

    const getCategory = (category) => {
      if (category === "1") return  "Construction";
      else if (category === "2") return  "Furniture";
      else if (category === "3") return  "Vehicle";
      else if (category === "4") return  "Technology";
      else if (category === "5") return  "Service";
      else return  "Electronics";
  }

  const getCondition = (category) => {
    if (category === "1") return  "Brand new";
    else if (category === "2") return  "Broken";
    else if (category === "3") return  "Used";
    else if (category === "4") return  "Vinted";
    else return  "Refurbished";
}

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
            toast.success("Offer is placed!");
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
      //setOrderInfo(result);
      //console.log(result.categories.toString());
      setName(result.name.toString());
      setDescription(result.itemDescription.toString());
      setLocation(result.location.toString());
      setCategoryValue(result.categories.toString());
      setQuantity(result.quantity.toString());
      setPrice(result.price.toString());
      setUnit(result.unit.toString());
      setCondition(result.condition.toString());
      setExpiration(result.expirationBlock.toString());
    });
  }

  return (
    <>
    <MainContainer>
        <MainBg style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain"}}></MainBg>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} 
    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <Container>
    <FormWrap>
        <FormContent>
          <Form  onSubmit={makeOffer}> 

          <FormH1>Make an offer</FormH1>

        
          <Grid container direction="row" justify ="center" alignItems="center">
                  <Grid item xs={3}></Grid>   
                  <Grid item xs={4} >
                    <Typography gutterBottom>Item name</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{name}</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Description</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{description}</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Location</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{location}</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Category</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{getCategory(category)}</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Condition</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{getCondition(condition)} </Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Price</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{price} Euro</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Quantity</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{quantity} {getUnit(unit)}</Typography>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <Typography gutterBottom>Validity of order </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom> {expirationBlock} Days </Typography>
                  </Grid>

        </Grid>
            
                <Row>
                <Column>
                    <TextField type = 'number' name = 'price' label = "Offer price" min="0" fullWidth variant='standard' required/>
                </Column>
                <Column>
                    <TextField type = 'text' name = "usecase" label = "Usecase"  multiline maxRows={4} fullWidth variant='standard' required/>
                </Column>
                <Column>
                    <TextField type = 'number' name = "earliestBlock" min="1" label = "Validity of offer in days" fullWidth variant='standard' required/>
                </Column>
              </Row>
              <FormButton type = 'submit'>Place offer</FormButton> 
            </Form>
          </FormContent> 
        </FormWrap>
      </Container>
      </MainContainer>
    </>
  );
  
}


export default MakeOffer;