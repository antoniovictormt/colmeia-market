"use server"

import { saveProductsToCookies } from "@/data/services/getProducts"

export async function clearCart() {
    await saveProductsToCookies([])
}
