import "@/styles/globals.css"
import { ReactNode } from "react"

export const metadata = {
    title: "Mock Checkout Flow",
    description: "Checkout flow mock built with Next.js, Tailwind and Shadcn UI"
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50 text-gray-900">
                <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
            </body>
        </html>
    )
}
