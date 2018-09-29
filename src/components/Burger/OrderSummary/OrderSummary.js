import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey, index) => {
        // capitalize because normally always the igKeys we get are lowercased
        return <li key={index}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>
    })
// let finalPrice = (x) => {
//     return x.toFixed(2) //need to keep decimals in place on the ordersummary Modal pop up
// }

    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
    );
}
export default orderSummary;