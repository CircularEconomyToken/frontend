import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink } from './OrderDetailElements';

const Order = ({item}) => {

    var orderID = item.orderID;
    //var orderOwner = item.orderOwner;
    var productName = item.name;
    
    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 

            <Column>
                <TitleText>Product name </TitleText>
                <Text> {item.name.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Unit </TitleText>
                <Text> {item.unit.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Category </TitleText>
                <Text> {item.categories.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Quantity </TitleText>
                <Text> {item.quantity.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>


           

            <Column>
                <NavBtn>
                    <NavBtnLink to = '/makeOffer'>Make offer</NavBtnLink>
                </NavBtn>
            </Column>

        </Container>
    )
}

export default Order;