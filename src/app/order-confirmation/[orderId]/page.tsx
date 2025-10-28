import { Header } from "@/components/Header"
import { getProducts } from "@/data/services/getProducts"
import { getSessionDataOrLogout } from "@/data/services/getUser"
import { getTotalQuantity } from "@/functions/getTotalProducts"
import { PaymentMethod, PaymentStatus } from "@/types"

import OrderConfirmationContent from "./_components/content"

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
