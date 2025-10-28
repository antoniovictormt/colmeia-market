import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">404</h2>
            <p className="mt-2 text-gray-600">Página não encontrada.</p>
            <Link href="/" className="mt-4 text-blue-600 underline">
                Voltar ao início
            </Link>
        </div>
    )
}
