"use server"

import { CartItem } from "@/types"
import { saveProductsToCookies, getProducts } from "@/data/services/getProducts"

export async function removeProduct(itemsToRemove: CartItem[]) {
    const existing = await getProducts()
    const currentCart: CartItem[] = Array.isArray(existing) ? existing : []

    const idsToRemove = new Set(itemsToRemove.map(i => i.product.id))

    const updatedCart = currentCart.filter(
        item => !idsToRemove.has(item.product.id)
    )

    await saveProductsToCookies(updatedCart)
}
