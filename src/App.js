
import './App.css';
import Header from './Header';
import Cart from  './Cart'
import ItemList from './ItemList';
import ContextProvider from './ContextProvider';
import { useState } from 'react';
import CartItems from './cartItems';

 
function App() {

  const [showModal,setShowModal] =useState(false)

  const show =()=>{
    setShowModal(true)
  }

  const hide =()=>{
    setShowModal(false)
  }
  return (
    <div className="App">
      
      <ContextProvider>
      <Header/>
      {showModal && <CartItems onhide={hide}/>}
      <Cart onshow={show}/>
      <ItemList></ItemList>
      </ContextProvider>
    </div>
  );
}

export default App;
