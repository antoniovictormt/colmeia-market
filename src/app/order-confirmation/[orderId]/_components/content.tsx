"use client"

import {
    CheckCircle,
    Clock,
    CreditCard,
    Home,
    Package,
    Truck
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    OrderConfirmationPageProps,
    PaymentMethod,
    PaymentStatus
} from "@/types"

export default function OrderConfirmationContent({
    status,
    method
}: OrderConfirmationPageProps) {
    const router = useRouter()
    const { orderId } = useParams()

    const paymentMethod = (method as PaymentMethod) || "pix"

    const initialStatus = (status as PaymentStatus) || "paid"

    const [orderStatus, setOrderStatus] = useState<PaymentStatus>(initialStatus)

    useEffect(() => {
        if (orderStatus === "pending") {
            const timer = setTimeout(() => setOrderStatus("paid"), 5000)
            return () => clearTimeout(timer)
        }
    }, [orderStatus])

    const getStatusBadge = () => {
        switch (orderStatus) {
            case "paid":
                return <Badge className="bg-green-500">Pago</Badge>
            case "processing":
                return <Badge className="bg-blue-500">Processando</Badge>
            case "pending":
                return <Badge variant="outline">Aguardando Pagamento</Badge>
        }
    }

    const getPaymentMethodName = () => {
        switch (paymentMethod) {
            case "pix":
                return "PIX"
            case "credit-card":
                return "Cartão de Crédito"
            case "boleto":
                return "Boleto Bancário"
            default:
                return "Não especificado"
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <CardTitle className="mb-2 text-3xl">
                            {orderStatus === "paid"
                                ? "Pedido Confirmado!"
                                : "Pedido Recebido!"}
                        </CardTitle>
                        <CardDescription className="text-base">
                            {orderStatus === "paid"
                                ? "Seu pedido foi confirmado e será processado em breve"
                                : "Aguardando confirmação do pagamento"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="bg-muted space-y-3 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground mb-1 text-sm">
                                        Número do Pedido
                                    </p>
                                    <p className="text-2xl font-bold">
                                        #{orderId}
                                    </p>
                                </div>
                                {getStatusBadge()}
                            </div>

                            {paymentMethod && (
                                <div className="border-t pt-3">
                                    <p className="text-muted-foreground mb-1 text-sm">
                                        Forma de Pagamento
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        <p className="font-medium">
                                            {getPaymentMethodName()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {orderStatus === "pending" && (
                            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/20">
                                <div className="flex items-start gap-3">
                                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" />
                                    <div>
                                        <h4 className="mb-1 text-sm font-semibold">
                                            Aguardando Pagamento
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            Seu pedido será processado assim que
                                            o pagamento for confirmado.
                                            {paymentMethod === "boleto" &&
                                                " Boletos podem levar até 2 dias úteis para compensar."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Acompanhe seu Pedido
                            </h3>

                            <div className="space-y-3">
                                <div
                                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                                        orderStatus === "paid"
                                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
                                            : "bg-muted border-muted"
                                    }`}
                                >
                                    <CheckCircle
                                        className={`h-5 w-5 shrink-0 ${
                                            orderStatus === "paid"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Pedido Confirmado
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {orderStatus === "paid"
                                                ? "Pagamento confirmado"
                                                : "Aguardando pagamento"}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center gap-3 rounded-lg p-3 ${
                                        orderStatus === "paid"
                                            ? "bg-blue-50 dark:bg-blue-900/10"
                                            : "bg-muted"
                                    }`}
                                >
                                    <Package
                                        className={`h-5 w-5 shrink-0 ${
                                            orderStatus === "paid"
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Preparando para Envio
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {orderStatus === "paid"
                                                ? "Separando produtos"
                                                : "Aguardando confirmação"}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted flex items-center gap-3 rounded-lg p-3">
                                    <Truck className="text-muted-foreground h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Em Trânsito
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Aguardando
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted flex items-center gap-3 rounded-lg p-3">
                                    <Home className="text-muted-foreground h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Entregue
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Aguardando
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                            <h4 className="mb-2 text-sm font-semibold">
                                📧 Confirmação por Email
                            </h4>
                            <p className="text-muted-foreground text-sm">
                                Enviamos um email de confirmação com todos os
                                detalhes do seu pedido. Você receberá
                                atualizações sobre o status da entrega.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                            <Button
                                onClick={() => router.push("/products")}
                                variant="outline"
                                className="flex-1"
                            >
                                Continuar Comprando
                            </Button>
                            <Button
                                onClick={() => router.push("/")}
                                className="flex-1"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Ir para Início
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
