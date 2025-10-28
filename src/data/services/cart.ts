"use client"

import { useCallback, useEffect, useState } from "react"

import { CartItem, Product } from "@/types"

function getCartFromCookies(): CartItem[] {
    if (typeof document === "undefined") return []
    const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("cart="))
        ?.split("=")[1]
    if (!cookie) return []
    try {
        return JSON.parse(decodeURIComponent(cookie))
    } catch {
        return []
    }
}

function saveCartToCookies(cart: CartItem[]) {
    if (typeof document === "undefined") return
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=${
        60 * 60 * 24 * 7
    }`
}

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const cart = getCartFromCookies()
        setItems(cart)
        setInitialized(true)
    }, [])

    useEffect(() => {
        if (!initialized) return
        saveCartToCookies(items)
    }, [items, initialized])

    const addToCart = useCallback((product: Product, quantity = 1) => {
        let updatedCart: CartItem[] = []

        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id)
            if (existing) {
                updatedCart = prev.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                )
            } else {
                updatedCart = [...prev, { product, quantity }]
            }
            return updatedCart
        })

        const newCount = updatedCart.reduce((acc, i) => acc + i.quantity, 0)
        return newCount
    }, [])

    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(i => i.product.id !== productId))
    }, [])

    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            setItems(prev =>
                prev
                    .map(i =>
                        i.product.id === productId
                            ? { ...i, quantity: Math.max(quantity, 1) }
                            : i
                    )
                    .filter(i => i.quantity > 0)
            )
        },
        []
    )

    const clearCart = useCallback(() => {
        setItems([])
        saveCartToCookies([])
    }, [])

    const total = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    )
    const count = items.reduce((acc, item) => acc + item.quantity, 0)

    // 🧩 Atualiza sempre que o count mudar

    useEffect(() => {
        if (!initialized) return
    }, [count, initialized])

    return {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        count
    }
}
