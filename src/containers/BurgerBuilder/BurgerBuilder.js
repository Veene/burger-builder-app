import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients : {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchaseable: false,
            purchasing: false,
        }
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey] //got an array of the numbers from ingredients obj
        })
        .reduce((acc, next) => {
            return acc + next; //should sum the array, so if theres atleast 1 in the array, sum will be positive so setState will give true, otherwise false. We need this to set disable on order button or not.
        },0)
        this.setState({purchaseable: sum > 0});

    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients //BECAUSE STATE SHOULD NOT BE MUTATED DIRECTLY
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return; //no negatives
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients //BECAUSE STATE SHOULD NOT BE MUTATED DIRECTLY
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 //disabledInfo[key] <= 0 will return true or false
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemove={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;