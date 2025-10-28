import { PaymentMethod } from "@/types"

import PaymentProcessingContent from "./_components/content"

export default async function PaymentProcessingPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const amount = String(params?.amount)
    const orderId = String(params.orderId?.slice(4))
    const method = String(params.method)

    return (
        <div className="bg-background min-h-screen">
            <PaymentProcessingContent
                amount={amount}
                orderId={orderId}
                method={method as PaymentMethod}
            />
        </div>
    )
}
