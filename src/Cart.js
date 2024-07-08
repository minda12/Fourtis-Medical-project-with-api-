import React, { useContext } from 'react'
import './Cart.css'
import shoppingCart from './shopping-cart.png'
import context from './Context'




function Cart(props) {
  const ctx = useContext(context)
  return (
   
    <div className='cart'>
        
        <button onClick ={props.onshow}className='button' >
          {/* {console.log('this is modal ',props.onshow)} */}
            <span id='Cart-item'>{ctx.Qty}</span>
            <img src ={shoppingCart} alt=" Should be here"/>
    </button>
    </div>
   
  )
}

export default Cart