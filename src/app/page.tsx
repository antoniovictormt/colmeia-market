"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center gap-6 py-24">
            <h1 className="text-center text-4xl font-bold">
                Mock Checkout Flow (Next.js)
            </h1>
            <p className="max-w-lg text-center text-gray-600">
                Simule um fluxo de checkout completo: login, registro, produtos
                e pagamento.
            </p>
            <div className="flex gap-4">
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
                <Link href="/register">
                    <Button variant="secondary">Registrar</Button>
                </Link>
            </div>
        </section>
    )
}
