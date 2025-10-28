"use client"

import { useEffect, useState } from "react"

interface Product {
    id: string
    name: string
    price: number
}

interface CartItem {
    product: Product
    quantity: number
}

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("cart")
        if (stored) setItems(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id)
            if (existing) {
                return prev.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, { product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) =>
        setItems(prev => prev.filter(i => i.product.id !== productId))

    const clearCart = () => setItems([])

    const total = items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    )
    const count = items.reduce((sum, i) => sum + i.quantity, 0)

    return { items, addToCart, removeFromCart, clearCart, total, count }
}
