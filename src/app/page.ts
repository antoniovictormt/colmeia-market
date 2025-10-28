import { getSessionDataOrLogout } from "@/data/services/getUser"
import { redirect } from "next/navigation"

export default async function Home() {
    await getSessionDataOrLogout()
    redirect("/products")
}
