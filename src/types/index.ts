import { Dispatch, SetStateAction } from "react"

export interface User {
    id: string
    name: string
    email: string
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface Order {
    id: string
    userId: string
    items: CartItem[]
    total: number
    paymentMethod: "pix" | "credit-card" | "boleto"
    status: "pending" | "completed" | "cancelled"
    createdAt: string
}

export type SessionData = {
    name: string
    email: string
}

export type HeaderProps = SessionData & {
    count: number
}

export type CheckoutContentProps = {
    products: CartItem[]
}

export type PaymentOptionProps = {
    id: string
    value: string
    icon: React.ReactNode
    title: string
    description: string
}

export interface CreditCardFormProps {
    cardNumber: string
    setCardNumber: Dispatch<SetStateAction<string>>
    cardName: string
    setCardName: Dispatch<SetStateAction<string>>
    cardExpiry: string
    setCardExpiry: Dispatch<SetStateAction<string>>
    cardCvv: string
    setCardCvv: Dispatch<SetStateAction<string>>
    formatCardNumber: (value: string) => string
    formatExpiry: (value: string) => string
    products: CartItem[]
}

export type PaymentStatus =
    | "initial"
    | "processing"
    | "paid"
    | "failed"
    | "expired"
    | "pending"
export type PaymentMethod = "pix" | "credit-card" | "boleto"

export interface PaymentData {
    orderId: string
    amount: number
    method: PaymentMethod
}

export type OrderConfirmationPageProps = {
    status: PaymentStatus
    method: PaymentMethod
}

export type PaymentProcessingContentProps = Omit<PaymentData, "amount"> & {
    amount: string
}
