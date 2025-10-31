import React, { useEffect, useState } from 'react';
import { fetchAPI } from "../apiHandling/fetchAPI";
import '../css/Menu.scss';
import CircularLoader from './CircularLoader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { auth, db } from '../firebase/setup';
import { updateDoc, arrayUnion, arrayRemove, getDoc, doc } from 'firebase/firestore';

interface MenuItem {
    id: number;
    name: string;
    image: string;
    prepTimeMinutes: number;
    difficulty: string;
    userId: number;
    price?: number; // Add price field for cart functionality
}

const Menu: React.FC = () => {
    const [dishes, setDishes] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addedItems, setAddedItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        loadMenu();
        fetchAddedItems(false);
    }, []);

    const loadMenu = async () => {
        setIsLoading(true);
        const data = await fetchAPI();
        // Add price field to each item (using userId as price for now)
        const dishesWithPrice = data.map((item: any) => ({
            ...item,
            price: item.userId || Math.floor(Math.random() * 20) + 10 // Generate random price if userId is not suitable
        }));
        setDishes(dishesWithPrice);
        setIsLoading(false);
    };

    const fetchAddedItems = async (stopLoading: boolean = true) => {
        const user = auth.currentUser;
        const uid = user ? user.uid : null;
        if (!uid) {
            if (stopLoading) {
                setIsLoading(false);
            }
            return setAddedItems([]);
        }

        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            console.log('User document exists:', userDoc.exists());
            if (userDoc.exists() && userDoc.data()?.addedItem) {
                const items = userDoc.data().addedItem as MenuItem[];
                console.log('Fetched added items:', items);
                setAddedItems(items);
            } else {
                console.log('No added items found');
                setAddedItems([]);
            }
        } catch (error) {
            console.error('Error fetching added items:', error);
            setAddedItems([]);
        } finally {
            if (stopLoading) {
                setIsLoading(false);
            }
        }
    };

    const addToCart = async (menuItem: MenuItem) => {
        const user = auth.currentUser;
        const uid = user ? user.uid : null;
        if (!uid) {
            console.log('No user authenticated');
            return null;
        }

        console.log('Adding item to cart:', menuItem);
        setIsLoading(true);
        try {
            await updateDoc(doc(db, 'users', uid), {
                addedItem: arrayUnion(menuItem)
            });
            console.log('Item added to cart successfully');
            fetchAddedItems();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setIsLoading(false);
        }
    };

    const removeFromCart = async (menuItem: MenuItem) => {
        const user = auth.currentUser;
        const uid = user ? user.uid : null;
        if (!uid) {
            return null;
        }

        setIsLoading(true);
        try {
            await updateDoc(doc(db, 'users', uid), {
                addedItem: arrayRemove(menuItem)
            });
            fetchAddedItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setIsLoading(false);
        }
    };

    const isItemAdded = (menuItem: MenuItem): boolean => {
        return addedItems.some(item => item.id === menuItem.id);
    };

    return (
        isLoading ? (
            <div>
                <CircularLoader />
            </div>
        ) : (
            <div className="menu">
                <h1 className="menuTitle">Our Menu</h1>
                <div className="menuList">
                    {dishes.map((menuItem, key) => {
                        const added = isItemAdded(menuItem);
                        return (
                            <div className="menuItem" key={key}>
                                <div
                                    className="menuItemImage"
                                    style={{ backgroundImage: `url(${menuItem.image})` }}>
                                    <span
                                        className="menuAddIcon"
                                        onClick={() =>
                                            added ? removeFromCart(menuItem) : addToCart(menuItem)
                                        }>
                                        {added ? (
                                            <RemoveCircleOutlineIcon
                                                style={{ color: '#d32f2f', fontSize: 28, cursor: 'pointer' }}
                                            />
                                        ) : (
                                            <AddCircleOutlineIcon
                                                style={{ color: '#000000', fontSize: 28, cursor: 'pointer' }}
                                            />
                                        )}
                                    </span>
                                </div>
                                <h4>{menuItem.name}</h4>
                                <p>Preparation time: {menuItem.prepTimeMinutes} Mins</p>
                                <p>Making Difficulty: {menuItem.difficulty}</p>
                                <p>Price: ${menuItem.price || menuItem.userId}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    );
};

export default Menu;
