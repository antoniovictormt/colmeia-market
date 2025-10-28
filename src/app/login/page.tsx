"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "./action"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await loginAction(new FormData(e.currentTarget as HTMLFormElement))
        setLoading(false)
        router.push("/products")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-20 flex max-w-md flex-col gap-4"
        >
            <h2 className="mb-2 text-center text-2xl font-semibold">Login</h2>
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="rounded border p-2"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                required
                className="rounded border p-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="rounded bg-blue-600 p-2 text-white"
                disabled={loading}
            >
                {loading ? "Entrando..." : "Entrar"}
            </button>
            <p className="text-center text-sm text-gray-500">
                Não tem conta?{" "}
                <a href="/register" className="text-blue-600 underline">
                    Cadastre-se
                </a>
            </p>
        </form>
    )
}
