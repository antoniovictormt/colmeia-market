"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = { id: "1", name: email.split("@")[0], email }

    const cookiesStore = await cookies()

    cookiesStore.set("user", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
    })

    return user
}

export async function logoutAction() {
    const cookiesStore = await cookies()
    cookiesStore.delete("user")
    redirect("/")
}
