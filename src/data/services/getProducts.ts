"use server"

import { CartItem } from "@/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function saveProductsToCookies(cart: CartItem[]) {
    const cookieStore = await cookies()

    // Remove o cookie se o carrinho estiver vazio
    if (cart.length === 0) {
        cookieStore.set("colmeia-mkt-products", "", {
            path: "/",
            maxAge: 0
        })
        return
    }

    // Salva o carrinho como JSON codificado
    const value = encodeURIComponent(JSON.stringify(cart))
    cookieStore.set("colmeia-mkt-products", value, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        sameSite: "lax"
    })
}

function decode(sessionString: string): CartItem {
    return JSON.parse(sessionString) as CartItem
}

export async function getProducts(): Promise<CartItem[]> {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("colmeia-mkt-products")
    if (!cookie) return []

    try {
        const decoded = decodeURIComponent(cookie.value)
        return JSON.parse(decoded)
    } catch {
        return []
    }
}
