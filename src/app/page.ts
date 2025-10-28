import { redirect } from "next/navigation"

import { getSessionDataOrLogout } from "@/data/services/getUser"

export default async function Home() {
    await getSessionDataOrLogout()
    redirect("/products")
}
