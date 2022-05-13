import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink } from './OfferDetailElements';

const OfferDetail = ({item}) => {

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
                    <NavBtnLink to = {{pathname: ""}}>Delete</NavBtnLink>
                </NavBtn>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {{pathname: ""}}>Update</NavBtnLink>
                </NavBtn>
            </Column>

        </Container>
    )
}



export default OfferDetail;