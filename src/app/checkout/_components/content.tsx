"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { z } from "zod"
import { toast } from "sonner"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, QrCode, FileText, Trash2, Plus, Minus } from "lucide-react"
import { CreditCardPreview } from "@/components/CreditCardPreview"
import { useCart } from "@/data/services/cart"

type PaymentMethod = "pix" | "credit-card" | "boleto"

const creditCardSchema = z.object({
    cardNumber: z
        .string()
        .min(1, "Número do cartão é obrigatório")
        .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Número do cartão inválido"),
    cardName: z
        .string()
        .min(1, "Nome é obrigatório")
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras"),
    cardExpiry: z
        .string()
        .min(1, "Validade é obrigatória")
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/AA)"),
    cardCvv: z
        .string()
        .min(1, "CVV é obrigatório")
        .regex(/^\d{3,4}$/, "CVV deve ter 3 ou 4 dígitos")
})

export function CheckoutContent() {
    const router = useRouter()
    const { items, total, updateQuantity, removeFromCart, clearCart } =
        useCart()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
    const [isProcessing, setIsProcessing] = useState(false)
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardExpiry, setCardExpiry] = useState("")
    const [cardCvv, setCardCvv] = useState("")

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "")
        return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    }

    const formatExpiry = (value: string) => {
        const cleaned = value.replace(/\D/g, "")
        return cleaned.length >= 2
            ? cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
            : cleaned
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()

        if (paymentMethod === "credit-card") {
            const parsed = creditCardSchema.safeParse({
                cardNumber,
                cardName,
                cardExpiry,
                cardCvv
            })
            if (!parsed.success) {
                toast.error(parsed.error.message)
                return
            }
        }

        setIsProcessing(true)

        setTimeout(() => {
            const orderId = `ORD-${Date.now()}`
            clearCart()

            router.push(
                `/payment-processing?orderId=${orderId}&amount=${total}&method=${paymentMethod}`
            )

            setIsProcessing(false)
        }, 1200)
    }

    if (items.length === 0) {
        return (
            <div className="bg-background flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">
                            Carrinho Vazio
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Adicione produtos ao carrinho para continuar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => router.push("/products")}
                            className="w-full"
                        >
                            Ver Produtos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <main className="container mx-auto px-4 py-6 sm:py-8">
            <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
                Finalizar Pedido
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
                {/* 🛒 Itens do Carrinho */}
                <div className="space-y-4 sm:space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                Itens do Carrinho
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                            {items.map(item => (
                                <div
                                    key={item.product.id}
                                    className="flex flex-col gap-3 border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:gap-4 sm:pb-4"
                                >
                                    <div className="relative h-32 w-full overflow-hidden rounded sm:h-20 sm:w-20">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-sm font-semibold sm:text-base">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-muted-foreground text-sm">
                                                    R${" "}
                                                    {item.product.price.toFixed(
                                                        2
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-sm font-semibold whitespace-nowrap sm:text-base">
                                                R${" "}
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.product.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="text-destructive h-4 w-4" />
                                                <span className="ml-1 text-xs sm:text-sm">
                                                    Remover
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 💳 Método de Pagamento */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                Forma de Pagamento
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={v =>
                                    setPaymentMethod(v as PaymentMethod)
                                }
                                className="space-y-3"
                            >
                                <PaymentOption
                                    id="pix"
                                    value="pix"
                                    icon={
                                        <QrCode className="text-primary h-5 w-5" />
                                    }
                                    title="PIX"
                                    description="Pagamento instantâneo"
                                />
                                <PaymentOption
                                    id="credit-card"
                                    value="credit-card"
                                    icon={
                                        <CreditCard className="text-primary h-5 w-5" />
                                    }
                                    title="Cartão de Crédito"
                                    description="Em até 12x sem juros"
                                />
                                <PaymentOption
                                    id="boleto"
                                    value="boleto"
                                    icon={
                                        <FileText className="text-primary h-5 w-5" />
                                    }
                                    title="Boleto Bancário"
                                    description="Vencimento em 3 dias"
                                />
                            </RadioGroup>

                            {/* Campos do cartão */}
                            {paymentMethod === "credit-card" && (
                                <CreditCardForm
                                    cardNumber={cardNumber}
                                    setCardNumber={setCardNumber}
                                    cardName={cardName}
                                    setCardName={setCardName}
                                    cardExpiry={cardExpiry}
                                    setCardExpiry={setCardExpiry}
                                    cardCvv={cardCvv}
                                    setCardCvv={setCardCvv}
                                    total={total}
                                    formatCardNumber={formatCardNumber}
                                    formatExpiry={formatExpiry}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* 📦 Resumo do Pedido */}
                <div className="lg:col-span-1">
                    <Card className="lg:sticky lg:top-24">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">
                                Resumo do Pedido
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>R$ {total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Frete
                                    </span>
                                    <span className="text-accent font-semibold">
                                        Grátis
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-base font-bold sm:text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">
                                        R$ {total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="w-full text-sm sm:text-base"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? "Processando..."
                                    : "Finalizar Pedido"}
                            </Button>

                            <p className="text-muted-foreground text-center text-xs leading-relaxed">
                                Ao finalizar, você concorda com nossos termos e
                                condições
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}

// 🔹 Subcomponentes auxiliares
function PaymentOption({
    id,
    value,
    icon,
    title,
    description
}: {
    id: string
    value: string
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div className="hover:bg-muted/50 flex cursor-pointer items-center space-x-2 rounded-lg border p-3 sm:p-4">
            <RadioGroupItem value={value} id={id} />
            <Label
                htmlFor={id}
                className="flex flex-1 cursor-pointer items-center gap-2 sm:gap-3"
            >
                {icon}
                <div>
                    <div className="text-sm font-semibold sm:text-base">
                        {title}
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm">
                        {description}
                    </div>
                </div>
            </Label>
        </div>
    )
}

function CreditCardForm({
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvv,
    setCardCvv,
    total,
    formatCardNumber,
    formatExpiry
}: any) {
    return (
        <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
            <CreditCardPreview
                cardNumber={cardNumber}
                cardName={cardName}
                cardExpiry={cardExpiry}
            />

            <div className="space-y-2">
                <Label htmlFor="card-number" className="text-sm">
                    Número do Cartão
                </Label>
                <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    className="text-sm sm:text-base"
                    maxLength={19}
                    value={cardNumber}
                    onChange={e =>
                        setCardNumber(formatCardNumber(e.target.value))
                    }
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="card-name" className="text-sm">
                    Nome no Cartão
                </Label>
                <Input
                    id="card-name"
                    placeholder="Nome como está no cartão"
                    className="text-sm uppercase sm:text-base"
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <Label htmlFor="card-expiry" className="text-sm">
                        Validade
                    </Label>
                    <Input
                        id="card-expiry"
                        placeholder="MM/AA"
                        className="text-sm sm:text-base"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={e =>
                            setCardExpiry(formatExpiry(e.target.value))
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="card-cvv" className="text-sm">
                        CVV
                    </Label>
                    <Input
                        id="card-cvv"
                        type="password"
                        placeholder="123"
                        className="text-sm sm:text-base"
                        maxLength={4}
                        value={cardCvv}
                        onChange={e =>
                            setCardCvv(e.target.value.replace(/\D/g, ""))
                        }
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="card-installments" className="text-sm">
                    Parcelas
                </Label>
                <select
                    id="card-installments"
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >
                    <option value="1">
                        1x de R$ {total.toFixed(2)} sem juros
                    </option>
                    <option value="2">
                        2x de R$ {(total / 2).toFixed(2)} sem juros
                    </option>
                    <option value="3">
                        3x de R$ {(total / 3).toFixed(2)} sem juros
                    </option>
                    <option value="6">
                        6x de R$ {(total / 6).toFixed(2)} sem juros
                    </option>
                    <option value="12">
                        12x de R$ {(total / 12).toFixed(2)} sem juros
                    </option>
                </select>
            </div>
        </div>
    )
}
