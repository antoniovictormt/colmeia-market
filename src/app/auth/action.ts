"use server"

import { cookies } from "next/headers"

export async function loginAction(email: string, password: string) {
    const user = { name: "John Doe", email, password }
    const cookiesStore = await cookies()
    cookiesStore.set("colmeia-mkt-user", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
    })
    return { ok: true }
}

export async function registerAction(
    name: string,
    email: string,
    password: string
) {
    const user = { name, email, password }
    const cookiesStore = await cookies()
    cookiesStore.set("colmeia-mkt-user", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
    })

    return { ok: true }
}

export async function logoutAction() {
    const cookiesStore = await cookies()

    cookiesStore.delete("colmeia-mkt-user")
    return { ok: true }
}
