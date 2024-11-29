import React, {createContext, useState, ReactNode, useEffect} from 'react';

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
    const [cartItems, setCartItems] = useState<string[]>(() => {
        // Load initial state from local storage
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    // Update local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (productId: string) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems, productId];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount: cartItems.length }}>
            {children}
        </CartContext.Provider>
    );
};