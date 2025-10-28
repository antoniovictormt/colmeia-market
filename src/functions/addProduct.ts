"use server"

import { getProducts, saveProductsToCookies } from "@/data/services/getProducts"
import { CartItem } from "@/types"

export async function addProduct(newItems: CartItem[]) {
    const existing = await getProducts()
    const currentCart: CartItem[] = Array.isArray(existing) ? existing : []

    const updatedCart = [...currentCart]

    for (const newItem of newItems) {
        const index = updatedCart.findIndex(
            i => i.product.id === newItem.product.id
        )

        if (index !== -1) {
            updatedCart[index].quantity += newItem.quantity
        } else {
            updatedCart.push(newItem)
        }
    }

    await saveProductsToCookies(updatedCart)
}
