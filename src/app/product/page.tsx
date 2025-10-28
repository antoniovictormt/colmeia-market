"use client"

import { useCart } from "@/data/services/cart"
import { useRouter } from "next/navigation"

const MOCK_PRODUCTS = [
    { id: "1", name: "Produto A", price: 120 },
    { id: "2", name: "Produto B", price: 200 },
    { id: "3", name: "Produto C", price: 75 }
]

export default function ProductsPage() {
    const { addToCart } = useCart()
    const router = useRouter()

    return (
        <section className="mx-auto mt-10 max-w-3xl space-y-6">
            <h2 className="text-center text-3xl font-semibold">Produtos</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {MOCK_PRODUCTS.map(p => (
                    <li
                        key={p.id}
                        className="flex flex-col items-center gap-2 rounded-lg border p-4"
                    >
                        <h3 className="text-lg font-medium">{p.name}</h3>
                        <p className="text-gray-500">R$ {p.price.toFixed(2)}</p>
                        <button
                            onClick={() => addToCart(p)}
                            className="rounded bg-blue-600 px-3 py-1 text-white"
                        >
                            Adicionar ao carrinho
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-center">
                <button
                    onClick={() => router.push("/checkout")}
                    className="rounded bg-green-600 px-4 py-2 text-white"
                >
                    Ir para o checkout
                </button>
            </div>
        </section>
    )
}
