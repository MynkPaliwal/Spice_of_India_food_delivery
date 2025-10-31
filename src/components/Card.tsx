import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/setup';
import { updateDoc, getDoc, doc, deleteField } from 'firebase/firestore';
import CircularLoader from './CircularLoader';
import '../css/Card.scss';

interface CartItem {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: number;
  difficulty: string;
  userId: number;
  price?: number;
}

const Card: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async (): Promise<void> => {
    setIsLoading(true);
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (!uid) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      const data = userDoc.data();

      if (userDoc.exists() && data?.addedItem) {
        setCartItems(data.addedItem as CartItem[]);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async (): Promise<void> => {
    alert('Thank you for your purchase!');
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (!uid) return;

    try {
      await updateDoc(doc(db, 'users', uid), {
        addedItem: deleteField(),
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return isLoading ? (
    <CircularLoader />
  ) : (
    <div className="cartContainer">
      <h1 className="cartTitle">Your Cart</h1>
      <div className="cartList">
        {cartItems.length === 0 ? (
          <div className="cartEmpty">
            <h3>Your cart is empty.</h3>
          </div>
        ) : (
          cartItems.map((menuItem, index) => (
            <div className="cartItem" key={index}>
              <div
                className="cartItemImage"
                style={{ backgroundImage: `url(${menuItem.image})` }}
              />
              <h4>{menuItem.name}</h4>
              <p>Preparation time: {menuItem.prepTimeMinutes} Mins</p>
              <p>Making Difficulty: {menuItem.difficulty}</p>
              <p>Price: ${menuItem.price || menuItem.userId}</p>
            </div>
          ))
        )}
      </div>

      {cartItems.length !== 0 && (
        <button
          className="cartBuyBtn"
          disabled={cartItems.length === 0}
          onClick={handleBuy}
        >
          Buy
        </button>
      )}
    </div>
  );
};

export default Card;
