import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    })
    .reduce((acc,next) => { //AKA flattening the array [[burgerIng1] *2,[burgerIng2],[burgerIng3]] -> 
        return acc.concat(next) // flattened/reduced: [burgerIng1,burgerIng1,burgerIng2,burgerIng3]
    },[])
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Add Ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;

