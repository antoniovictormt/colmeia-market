import { CartItem } from "@/types"

import { getTotalPrice } from "./getTotalPrice"

export function getInstallments(cart: CartItem[], maxInstallments = 12) {
    const total = getTotalPrice(cart)
    const possibleInstallments = [1, 2, 3, 6, 12].filter(
        n => n <= maxInstallments
    )

    return possibleInstallments.map(n => {
        const installmentValue = total / n
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(installmentValue)

        return {
            value: n.toString(),
            label: `${n}x de ${formattedValue} sem juros`
        }
    })
}
