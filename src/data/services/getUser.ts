"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { SessionData } from "@/types"

function decode(sessionString: string): SessionData {
    return JSON.parse(sessionString) as SessionData
}

export async function getSessionDataOrLogout(): Promise<SessionData> {
    const cookiesStore = await cookies()
    const sessionCookie = cookiesStore.get("colmeia-mkt-user")
    if (!sessionCookie) {
        redirect("/logout")
    }
    const session = decode(sessionCookie.value)

    return session
}
