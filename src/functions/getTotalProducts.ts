import { CartItem } from "@/types"

export function getTotalQuantity(cart: CartItem[]): number {
    if (!Array.isArray(cart)) return 0
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
}
