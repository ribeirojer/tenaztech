import React, { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: any) => {
	const [cartItems, setCartItems] = useState<any>([]);

	const addToCart = (item: any) => {
		setCartItems([...cartItems, item]);
	};

	const removeFromCart = (itemId: any) => {
		setCartItems(cartItems.filter((item: { id: any }) => item.id !== itemId));
	};

	return (
		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};
