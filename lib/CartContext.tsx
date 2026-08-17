"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getBooks, Book } from "@/lib/api";

export type CartItem = {
  id: string;
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  allBooks: Book[];
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }

    // Fetch books to calculate totals and validate cart items
    getBooks().then(data => {
      setAllBooks(data);
    });
  }, []);

  // Synchronize and remove obsolete/deleted items when allBooks is loaded
  useEffect(() => {
    if (allBooks.length > 0 && cartItems.length > 0) {
      const validItems = cartItems.filter(item => allBooks.some(b => b.id === item.id));
      if (validItems.length !== cartItems.length) {
        setCartItems(validItems);
      }
    }
  }, [allBooks]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (id: string, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { id, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  // Only count items that exist in the database
  const validCartItems = allBooks.length > 0 
    ? cartItems.filter(item => allBooks.some(b => b.id === item.id))
    : cartItems;

  const cartCount = validCartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = validCartItems.reduce((total, item) => {
    const book = allBooks.find(b => b.id === item.id);
    if (!book) return total;
    const rawPrice = String(book.price || '0').replace(/[^0-9.]/g, '');
    const price = parseFloat(rawPrice) || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems: validCartItems, allBooks, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isMounted }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
