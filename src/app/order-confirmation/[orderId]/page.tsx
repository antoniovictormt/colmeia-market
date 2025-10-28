import { Header } from "@/components/Header"
import { getSessionDataOrLogout } from "@/data/services/getUser"
import { getProducts } from "@/data/services/getProducts"
import { getTotalQuantity } from "@/functions/getTotalProducts"
import OrderConfirmationContent from "./_components/content"
import { PaymentMethod, PaymentStatus } from "@/types"

export default async function OrderConfirmationPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams

    const session = await getSessionDataOrLogout()
    const products = await getProducts()
    const count = getTotalQuantity(products)

    return (
        <div className="bg-background min-h-screen">
            <Header email={session.email} name={session.name} count={count} />

            <OrderConfirmationContent
                method={params.method as PaymentMethod}
                status={params.status as PaymentStatus}
            />
        </div>
    )
}
