import "@/styles/globals.css"

import { ReactNode } from "react"

export const metadata = {
    title: "Colemia Market",
    description: "Your place to buy everything"
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
