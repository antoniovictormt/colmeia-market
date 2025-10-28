"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "../login/action"

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("email", form.email)
        formData.append("password", form.password)
        formData.append("name", form.name)
        await loginAction(formData) // Simula registro + login
        setLoading(false)
        router.push("/products")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-20 flex max-w-md flex-col gap-4"
        >
            <h2 className="mb-2 text-center text-2xl font-semibold">
                Criar conta
            </h2>
            <input
                name="name"
                placeholder="Nome"
                className="rounded border p-2"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="rounded border p-2"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                className="rounded border p-2"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button
                type="submit"
                className="rounded bg-green-600 p-2 text-white"
                disabled={loading}
            >
                {loading ? "Criando..." : "Registrar"}
            </button>
        </form>
    )
}
