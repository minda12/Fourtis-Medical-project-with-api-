import React, { useContext, useEffect, useState } from 'react';
import Context from './Context';

function ContextProvider({ children }) {
  const ctx = useContext(Context);
  const [item, setItem] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [Qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("cartItem updated:", cartItem);
  }, [cartItem]);

  const AddItemToList = (item) => {
    setItem(prev => [...prev, item]);
  };

  const  AdditemToCart = async (itm, price, size, id) => {
    if (item.Large===0 ||item.Medium ===0||item.Small===0  )
      {
      return

      }
    const itemsForCart = {
      id: id,
      ItemName: itm,
      Itemprice: price,
      Itemsize: size,
      ItemQty: 1
    };
     
    const existingItemIndex = cartItem.findIndex(item => item.id === id && item.Itemsize === size);

    if (existingItemIndex !== -1) {
      // Item exists in the cart, increment its quantity
      const updatedCartItems = [...cartItem];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        ItemQty: updatedCartItems[existingItemIndex].ItemQty + 1
      };
      setCartItem(updatedCartItems);
      setTotal(prev => prev + Number(price));
    } else {
      // Item does not exist in the cart, add it
      setCartItem(prev => [...prev, itemsForCart]);
      setTotal(prev => prev + Number(price));
    }

    setQty(Qty => Qty + 1);

    if (size === 'large'  ) {
      setItem(prevItems => prevItems.map(item => {
        console.log("coming from provider AdditemToCart", item);
        if (item.id === id && item.Large>0) {
          return { ...item, Large: item.Large - 1 };
        }
        return item;
      }));
    }
    else  if (size === 'Medium') {
      setItem(prevItems => prevItems.map(item => {
        console.log("coming from provider AdditemToCart", item);
        if (item.id === id && item.Medium>0) {
          return { ...item, Medium: item.Medium - 1 };
        }
        return item;
      }));
    }
    else  if (size === 'Small') {
      setItem(prevItems => prevItems.map(item => {
        console.log("coming from provider AdditemToCart", item);
        if (item.id === id && item.Small>0) {
          return { ...item, Small: item.Small - 1 };
        }
        return item;
      }));

      try {
        
        const res = await fetch('https://crudcrud.com/api/9ebeb5f0db294ad881d5b89d8216ed0c/cartitems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemsForCart)
        });
         console.log('respomse',res)
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    
  };


    }
  

  const incrementItem = (id, size) => {
    const itemIndex = cartItem.findIndex(item => item.id === id && item.Itemsize === size);

    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItem];
      updatedCartItems[itemIndex] = {
        ...updatedCartItems[itemIndex],
        ItemQty: updatedCartItems[itemIndex].ItemQty + 1
      };
      setCartItem(updatedCartItems);
      setTotal(prev => prev + Number(updatedCartItems[itemIndex].Itemprice));
    }
  };

  const decrementItem = (id, size) => {
    const itemIndex = cartItem.findIndex(item => item.id === id && item.Itemsize === size);

    if (itemIndex !== -1 && cartItem[itemIndex].ItemQty > 0) {
      const updatedCartItems = [...cartItem];
      updatedCartItems[itemIndex] = {
        ...updatedCartItems[itemIndex],
        ItemQty: updatedCartItems[itemIndex].ItemQty - 1
      };
      setCartItem(updatedCartItems);
      setTotal(prev => prev - Number(updatedCartItems[itemIndex].Itemprice));
    }
  };

  const ClearCart = () => {
    setCartItem([]);
    setQty(0);
    setTotal(0);
    setItem([])
  };


  const context = {
    items: item,
    cartItems: cartItem,
    Total: total,
    Qty: Qty,
    addItemToList: AddItemToList,
    additemToCart: AdditemToCart,
    incrementQuant: incrementItem,
    decrementQuant: decrementItem,
    clearCart: ClearCart
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
