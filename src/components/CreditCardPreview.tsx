"use client"

import { CreditCard } from "lucide-react"

interface CreditCardPreviewProps {
    cardNumber: string
    cardName: string
    cardExpiry: string
}

const CardBrandLogo = ({ brand }: { brand: string }) => {
    switch (brand) {
        case "Visa":
            return (
                <svg className="h-8 w-auto" viewBox="0 0 48 16" fill="none">
                    <rect width="48" height="16" rx="2" fill="white" />
                    <path
                        d="M19.5 3.5L17.8 12.5H15.5L17.2 3.5H19.5ZM28.5 8.2C28.5 9.8 26.8 10.7 25.5 11.2C24.2 11.7 23.8 12 23.8 12.4C23.8 13 24.5 13.5 25.8 13.5C26.8 13.5 27.5 13.3 28.2 13L28.5 14.5C27.8 14.8 26.8 15 25.7 15C23.3 15 21.7 13.8 21.7 12C21.7 10.5 23.2 9.5 24.3 9C25.4 8.5 25.8 8.2 25.8 7.7C25.8 7.2 25.3 6.8 24.3 6.8C23.2 6.8 22.3 7 21.5 7.5L21.2 6C22.2 5.5 23.3 5.2 24.5 5.2C27 5.2 28.5 6.4 28.5 8.2ZM35.5 12.5H33.5L33.3 11.5H30.8L30.3 12.5H28L31.3 4.2C31.6 3.6 32.1 3.3 32.7 3.3H34.3L35.5 12.5ZM32.8 6L31.3 9.8H33.8L33.2 6H32.8ZM15.5 3.5L13.2 12.5H11L8.5 5.8C8.3 5.3 8.2 5.1 7.8 4.9C7.2 4.6 6.3 4.3 5.5 4.1L5.6 3.5H9.5C10.2 3.5 10.8 4 10.9 4.8L11.7 9.5L13.8 3.5H15.5Z"
                        fill="#1A1F71"
                    />
                </svg>
            )
        case "Mastercard":
            return (
                <svg className="h-8 w-auto" viewBox="0 0 48 30" fill="none">
                    <circle cx="18" cy="15" r="12" fill="#EB001B" />
                    <circle cx="30" cy="15" r="12" fill="#F79E1B" />
                    <path
                        d="M24 6.5C21.5 8.5 20 11.5 20 15C20 18.5 21.5 21.5 24 23.5C26.5 21.5 28 18.5 28 15C28 11.5 26.5 8.5 24 6.5Z"
                        fill="#FF5F00"
                    />
                </svg>
            )
        case "Amex":
            return (
                <svg className="h-8 w-auto" viewBox="0 0 48 16" fill="none">
                    <rect width="48" height="16" rx="2" fill="#006FCF" />
                    <path
                        d="M8.5 3.5H11L12.5 7L14 3.5H16.5L13.8 9.5V12.5H11.2V9.5L8.5 3.5ZM20.5 3.5L18 12.5H15.5L18 3.5H20.5ZM26 3.5L23.5 12.5H21L18.5 3.5H21L22.5 9L24 3.5H26ZM28 3.5H32.5V5.5H30.5V7H32.5V9H30.5V10.5H32.5V12.5H28V3.5ZM36 3.5L38.5 7.5L41 3.5H43.5L39.5 9.5V12.5H37V9.5L33 3.5H36Z"
                        fill="white"
                    />
                </svg>
            )
        default:
            return (
                <div className="rounded bg-white/10 px-3 py-1 text-sm font-semibold text-white/90">
                    {brand}
                </div>
            )
    }
}

export function CreditCardPreview({
    cardNumber,
    cardName,
    cardExpiry
}: CreditCardPreviewProps) {
    const formatCardNumber = (number: string) => {
        const cleaned = number.replace(/\s/g, "")
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || ""
        return formatted.padEnd(19, "•")
    }

    const getCardBrand = (number: string) => {
        const cleaned = number.replace(/\s/g, "")
        if (cleaned.startsWith("4")) return "Visa"
        if (cleaned.startsWith("5")) return "Mastercard"
        if (cleaned.startsWith("34") || cleaned.startsWith("37")) return "Amex"
        return "Cartão"
    }

    const brand = getCardBrand(cardNumber)

    return (
        <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[1.586/1] overflow-hidden rounded-xl bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 p-6 shadow-2xl sm:rounded-2xl sm:p-8">
                {/* Fundo decorativo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 h-48 w-48 translate-x-24 -translate-y-24 rounded-full bg-white blur-3xl sm:h-64 sm:w-64 sm:translate-x-32 sm:-translate-y-32" />
                    <div className="absolute bottom-0 left-0 h-36 w-36 -translate-x-18 translate-y-18 rounded-full bg-white blur-3xl sm:h-48 sm:w-48 sm:-translate-x-24 sm:translate-y-24" />
                </div>

                {/* Conteúdo */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                    {/* Topo */}
                    <div className="mb-6 flex items-start justify-between sm:mb-8">
                        <div className="h-7 w-10 rounded bg-linear-to-br from-amber-400 to-amber-600 opacity-80 sm:h-8 sm:w-12" />
                        <CardBrandLogo brand={brand} />
                    </div>

                    {/* Número, nome e validade */}
                    <div className="space-y-4">
                        <div className="font-mono text-base tracking-wider text-white sm:text-lg">
                            {formatCardNumber(cardNumber) ||
                                "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <div className="text-[10px] tracking-wide text-white/60 uppercase sm:text-xs">
                                    Nome
                                </div>
                                <div className="text-xs font-medium tracking-wide text-white uppercase sm:text-sm">
                                    {cardName || "SEU NOME"}
                                </div>
                            </div>

                            <div className="space-y-1 text-right">
                                <div className="text-[10px] tracking-wide text-white/60 uppercase sm:text-xs">
                                    Validade
                                </div>
                                <div className="text-xs font-medium tracking-wider text-white sm:text-sm">
                                    {cardExpiry || "MM/AA"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ícone do cartão */}
                <div className="absolute right-4 bottom-4 opacity-10 sm:right-5 sm:bottom-5">
                    <CreditCard className="h-20 w-20 text-white sm:h-24 sm:w-24" />
                </div>
            </div>
        </div>
    )
}
