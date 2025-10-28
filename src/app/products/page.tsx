import { Header } from "@/components/Header"
import { getSessionDataOrLogout } from "@/data/services/getUser"
import { ProductsContent } from "./_components/content"
import { getProducts } from "@/data/services/getProducts"
import { getTotalQuantity } from "@/functions/getTotalProducts"

export default async function ProductsPage() {
    const session = await getSessionDataOrLogout()
    const products = await getProducts()
    const count = getTotalQuantity(products)

    return (
        <div className="bg-background min-h-screen">
            <Header email={session.email} name={session.name} count={count} />

            <ProductsContent />
        </div>
    )
}
