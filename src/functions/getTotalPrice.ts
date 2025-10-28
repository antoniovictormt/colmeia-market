import { CartItem } from "@/types"

export function getTotalPrice(cart: CartItem[]): number {
    if (!Array.isArray(cart)) return 0
    return cart.reduce(
        (sum, item) => sum + (item.product.price * item.quantity || 0),
        0
    )
}
