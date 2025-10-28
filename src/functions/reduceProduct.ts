"use server"

import { getProducts, saveProductsToCookies } from "@/data/services/getProducts"
import { CartItem } from "@/types"

export async function reduceProduct(itemsToReduce: CartItem[]) {
    const existing = await getProducts()
    const currentCart: CartItem[] = Array.isArray(existing) ? existing : []

    const updatedCart = [...currentCart]

    for (const item of itemsToReduce) {
        const index = updatedCart.findIndex(
            i => i.product.id === item.product.id
        )

        if (index !== -1) {
            updatedCart[index].quantity -= item.quantity

            if (updatedCart[index].quantity <= 0) {
                updatedCart.splice(index, 1)
            }
        }
    }

    await saveProductsToCookies(updatedCart)
}
