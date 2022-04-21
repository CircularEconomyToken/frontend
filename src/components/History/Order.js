import { Container, Image, Column, TitleText, Text } from './OrderElements';

const Order = ({item}) => {
    return (
        <Container>
            <Image src = {require('../../images/package.png')}/> 

            <Column>
                <TitleText> Name </TitleText>
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

        </Container>
    )
}

export default Order;