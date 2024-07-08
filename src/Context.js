import React from 'react'

const context  = React.createContext({
  items:[],
  cartItems:[],
  Total:0,
  Qty:0,
  addItemToList : (id)=>{},
  additemToCart : (id)=>{}
})


export default context