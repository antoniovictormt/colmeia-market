import { cookies } from "next/headers"

export async function getUser() {
    const cookiesStore = await cookies()
    const cookie = cookiesStore.get("user")?.value
    return cookie ? JSON.parse(cookie) : null
}
