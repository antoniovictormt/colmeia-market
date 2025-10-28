"use server"

import { getProducts, saveProductsToCookies } from "@/data/services/getProducts"
import { CartItem } from "@/types"

export async function removeProduct(itemsToRemove: CartItem[]) {
    const existing = await getProducts()
    const currentCart: CartItem[] = Array.isArray(existing) ? existing : []

    const idsToRemove = new Set(itemsToRemove.map(i => i.product.id))

    const updatedCart = currentCart.filter(
        item => !idsToRemove.has(item.product.id)
    )

    await saveProductsToCookies(updatedCart)
}
