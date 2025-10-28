"use client"

import { AlertCircle, CheckCircle, Clock, Copy, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PaymentProcessingContentProps, PaymentStatus } from "@/types"

import { clearCart } from "./action"

export default function PaymentProcessingContent({
    orderId,
    amount,
    method
}: PaymentProcessingContentProps) {
    const router = useRouter()

    const [status, setStatus] = useState<PaymentStatus>("initial")
    const [progress, setProgress] = useState(0)
    const [pixCode, setPixCode] = useState("")
    const [boletoCode, setBoletoCode] = useState("")

    useEffect(() => {
        if (!method) return

        if (method === "pix") {
            const pixValue = String(amount?.slice(3))
                .replace(",", "")
                .replace(".", "")
            const mockPixCode = `00020126580014br.gov.bcb.pix0136${orderId}520400005303986540${pixValue}5802BR5913colmeia-market6009SAO PAULO62070503***6304`
            setPixCode(mockPixCode)
        } else if (method === "boleto") {
            const mockBoletoCode = `34191.79001 01043.510047 91020.150008 ${Math.floor(
                Math.random() * 9
            )} ${Math.floor(100000000000 + Math.random() * 900000000000)}`
            setBoletoCode(mockBoletoCode)
        }

        simulatePaymentFlow()
    }, [method])

    const simulatePaymentFlow = async () => {
        setStatus("initial")
        setProgress(10)

        setTimeout(() => {
            setStatus("processing")
            setProgress(40)
        }, 1000)

        setTimeout(
            async () => {
                const outcomes: PaymentStatus[] = [
                    "paid",
                    "paid",
                    "paid",
                    "failed",
                    "expired"
                ]
                const finalStatus =
                    outcomes[Math.floor(Math.random() * outcomes.length)]
                setStatus(finalStatus)
                setProgress(100)

                if (!method) return

                if (finalStatus === "paid") {
                    toast.success("Pagamento confirmado!")

                    await clearCart()

                    setTimeout(() => {
                        router.push(
                            `/order-confirmation/${orderId}?status=paid&method=${method}`
                        )
                    }, 2000)
                } else if (finalStatus === "failed") {
                    toast.error("Pagamento falhou. Tente novamente.")
                } else if (finalStatus === "expired") {
                    toast.error("Pagamento expirado.")
                }
            },
            method === "credit-card" ? 3000 : 5000
        )
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Código copiado!")
    }

    const getStatusIcon = () => {
        switch (status) {
            case "initial":
                return (
                    <Clock className="text-muted-foreground h-12 w-12 animate-pulse" />
                )
            case "processing":
                return (
                    <Clock className="text-primary h-12 w-12 animate-pulse" />
                )
            case "paid":
                return <CheckCircle className="h-12 w-12 text-green-500" />
            case "failed":
                return <XCircle className="text-destructive h-12 w-12" />
            case "expired":
                return <AlertCircle className="h-12 w-12 text-orange-500" />
        }
    }

    const getStatusText = () => {
        switch (status) {
            case "initial":
                return "Iniciando pagamento..."
            case "processing":
                return "Processando pagamento..."
            case "paid":
                return "Pagamento confirmado!"
            case "failed":
                return "Pagamento falhou"
            case "expired":
                return "Pagamento expirado"
        }
    }

    if (!method) return null

    return (
        <div className="bg-background min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-2xl space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mb-4 flex justify-center">
                                {getStatusIcon()}
                            </div>
                            <CardTitle className="text-2xl">
                                {getStatusText()}
                            </CardTitle>
                            <CardDescription>Pedido #{orderId}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={progress} className="mb-4" />
                            <p className="text-muted-foreground text-center text-sm">
                                {status === "processing" &&
                                    "Aguarde enquanto processamos seu pagamento..."}
                                {status === "initial" &&
                                    "Preparando tudo para você..."}
                                {status === "paid" &&
                                    "Redirecionando para confirmação..."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* PIX */}
                    {method === "pix" && status !== "paid" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Pagar com PIX</CardTitle>
                                <CardDescription>
                                    Escaneie o QR Code ou copie o código PIX
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex justify-center rounded-lg bg-white p-6">
                                    <QRCodeSVG
                                        value={pixCode}
                                        size={200}
                                        level="H"
                                        includeMargin
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-muted flex items-center justify-between rounded-lg p-3">
                                        <code className="mr-2 flex-1 text-xs break-all">
                                            {pixCode}
                                        </code>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                copyToClipboard(pixCode)
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-muted-foreground text-center text-xs">
                                        Código PIX Copia e Cola
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {method === "boleto" && status !== "paid" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Pagar com Boleto</CardTitle>
                                <CardDescription>
                                    Copie a linha digitável para pagar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Linha Digitável
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-muted flex-1 rounded-lg p-3 font-mono text-sm break-all">
                                            {boletoCode}
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                copyToClipboard(boletoCode)
                                            }
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed p-6">
                                    <div className="space-y-2 text-center">
                                        <p className="font-semibold">
                                            Valor do Boleto
                                        </p>
                                        <p className="text-primary text-3xl font-bold">
                                            {amount}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            Vencimento:{" "}
                                            {new Date(
                                                Date.now() +
                                                    3 * 24 * 60 * 60 * 1000
                                            ).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Botões de ação */}
                    {(status === "failed" || status === "expired") && (
                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push("/checkout")}
                            >
                                Voltar ao Checkout
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={simulatePaymentFlow}
                            >
                                Tentar Novamente
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
