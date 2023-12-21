import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { faker } from '@faker-js/faker';
import { ProductReducer } from './Reducer';
import { cartReducer } from './Reducer';

const Cart=createContext();

faker.seed(99);
const  Context=({children})=> {

const products=[...Array(20)].map(()=>({
 id:faker.string.uuid(),
 name:faker.commerce.productName(),
 price:faker.commerce.price(),
 image:faker.image.avatar(),
 inStock:faker.helpers.arrayElement([0,3,5,6,7]),
fastDelivery:faker.datatype.boolean(),
rating:faker.helpers.arrayElement([1,2,3,4,5]),

}));

const [state,dispatch]=useReducer(cartReducer,{
  products:products,
  cart:[]
});

const [productState,productDispatch]=useReducer(ProductReducer,{
 byStock:false,
 byFastDelivery:false,
 byRating:0,
 searchQuery:"",
});

  return (
    <div>
      <Cart.Provider value={{state,dispatch,productState,productDispatch}}>
        {children}
      </Cart.Provider>
    </div>
  )
}

export default Context

export const CartState=()=>
{
  return useContext(Cart);
}