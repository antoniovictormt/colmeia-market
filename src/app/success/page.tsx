"use client"

import Link from "next/link"

export default function SuccessPage() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
            <h2 className="text-3xl font-semibold">Compra concluída!</h2>
            <p>
                Obrigado pela sua compra. Verifique seu e-mail para os detalhes.
            </p>
            <Link
                href="/products"
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Voltar para produtos
            </Link>
        </section>
    )
}
