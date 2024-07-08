import React, { useState, useContext } from 'react';
import './Header.css';
import context from './Context';

const Items = {
  id: 0,
  Name: "",
  Desc: '',
  Price: '',
  Quantity:''
}

function Header() {
  const ctx = useContext(context);
  const [itemsinputdata, setItemsInputData] = useState(Items);
  const [id, setId] = useState(1);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItemsInputData(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log("coming from Header changeHandler", name, value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setId(id => id + 1);
    ctx.addItemToList(itemsinputdata);
    console.log("coming from Header submitHandler", itemsinputdata);
    setItemsInputData({
      id: id,
      Name: "",
      Desc: '',
      Price: '',
     Quantity:'',
    });
  }

  return (
    <>
      <p style={{ fontStyle: 'italic', fontSize: '35px', color: 'rgb(43 120 4)' }}>Fourtis Medical</p>
      <form onSubmit={submitHandler} className='container'>
        <div>
          <label className='container-label' htmlFor='Name'>Medicine Name</label>
          <input type='text' id='Name' onChange={changeHandler} name='Name' value={itemsinputdata.Name}></input>
        </div>
        <div>
          <label className='container-label' htmlFor='Description'>Description</label>
          <input type='text' id='Desc' onChange={changeHandler} name='Desc' value={itemsinputdata.Desc}></input>
        </div>
        <div>
          <label className='container-label' htmlFor='Price'>Price</label>
          <input type='number' id='Price' onChange={changeHandler} name='Price' value={itemsinputdata.Price}></input>
        </div><div>
          <label className='container-label' htmlFor='Quantity'>Quantity</label>
          <input type='number' id='Quantity' onChange={changeHandler} name='Quantity' value={itemsinputdata.Quantity}></input>
        </div>
       
        <button type='submit' id='add-Item'>Add Items</button>
      </form>
    </>
  )
}

export default Header;
