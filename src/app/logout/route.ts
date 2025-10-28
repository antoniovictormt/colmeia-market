import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
    const cookiesStore = await cookies()
    cookiesStore.delete("colmeia-mkt-user")
    redirect("/home")
}
