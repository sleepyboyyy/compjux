import React, { createContext, useState, ReactNode } from 'react';

interface CartContextProps {
    cartItems: string[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartItemCount: number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<string[]>([]);

    const addToCart = (productId: string) => {
        setCartItems((prevItems) => [...prevItems, productId]);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount: cartItems.length }}>
            {children}
        </CartContext.Provider>
    );
};