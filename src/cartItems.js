import React, { useContext } from 'react'
import Modal from './Modal'
import './cartItems.css'
import context from './Context'

function CartItems(props) {

    
    const ctx =useContext(context)
    console.log("comming from cartitems ",ctx)


    const increment =(id,size)=>{
      ctx.incrementQuant(id,size)
      console.log("increment from cartitems")
    }
    const decrement =(id,size)=>{
      ctx.decrementQuant(id,size)
    }

    const orderHandler = () => {
      alert(`Order Placed for ₹${ctx.Total}. Your Order ID is: 1`);
      ctx.clearCart();
      props.onhide();
    };
    
  return (
    <Modal onClick={props.onhide}>
    <div>
     <p>Your Shopping Cart</p>
    <button className='btn-cartItm' onClick={()=>{props.onhide()}}>X</button>
        <ul className='ctnr-itm' >
        <div id='heading'>Item Size Price</div>
          {ctx.cartItems.map((items,index) =>{
         
           return <li  className='itmList' key ={index}>
            {/* {console.log("comming from cartitems ",ctx)} */}

            <span id='itmname'>{items.ItemName}</span>
            <span id='itmsize'>{items.Itemsize}</span>
            <span id='itmprice'>₹{items.Itemprice}</span>

            <button onClick={()=>{decrement(items.id,items.Itemsize)}} >-</button><label>{items.ItemQty}</label><button onClick={()=>{increment(items.id,items.Itemsize)}} >+</button>
            {/* <button onClick={decrement}>-</button> */}

            </li>
          })}

        </ul>

        <span id='total'>Total<span>₹{ctx.Total}</span></span>
        <div className='cancel-order'><button onClick={props.onhide}>Cancel</button>
        <button  onClick={orderHandler}>Order</button></div>




    </div>
    
    
    </Modal>
  )
}

export default CartItems