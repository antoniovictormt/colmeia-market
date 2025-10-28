"use client"

import { useCart } from "@/data/services/cart"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart()
    const router = useRouter()

    const handlePayment = async () => {
        clearCart()
        router.push("/success")
    }

    return (
        <section className="mx-auto mt-12 max-w-2xl space-y-6">
            <h2 className="text-3xl font-semibold">Checkout</h2>

            {items.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className="divide-y">
                        {items.map(item => (
                            <li
                                key={item.product.id}
                                className="flex justify-between py-2"
                            >
                                <span>{item.product.name}</span>
                                <span>
                                    R${" "}
                                    {(
                                        item.product.price * item.quantity
                                    ).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-right text-lg font-medium">
                        Total: R$ {total.toFixed(2)}
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handlePayment}
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}
