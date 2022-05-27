import { Container, Image, Column, TitleText, Text, NavBtn, NavBtnLink } from './OrderDetailElements';

const OrderDetail = ({item}) => {

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

    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 
            <Column>
                <TitleText>Item name </TitleText>
                <Text> {item.name.toString()} </Text>
            </Column>

            <Column>
                <TitleText> Category </TitleText>
                <Text> {getCategory(item.categories.toString())} </Text>
            </Column>

            <Column>
                <TitleText> Quantity </TitleText>
                <Text> {item.quantity.toString()}{getUnit(item.unit.toString())}</Text>
            </Column>

            <Column>
                <TitleText> Condition </TitleText>
                <Text> {getCondition(item.condition.toString())} </Text>
            </Column>

            <Column>
                <TitleText> Price </TitleText>
                <Text> {item.price.toString()} </Text>
            </Column>

            <Column>
                <NavBtn>
                    <NavBtnLink to = {{pathname: `/makeOffer/${item.address}/${item.orderId}`}}> Make offer</NavBtnLink>
                </NavBtn>
            </Column>

        </Container>
    )
}



export default OrderDetail;