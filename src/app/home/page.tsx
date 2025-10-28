"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ShoppingCart,
    Package,
    CreditCard,
    Shield,
    TrendingUp,
    Star
} from "lucide-react"
import { Header } from "@/components/Header"
import { mockedProducts } from "@/data/products"
import { useRouter } from "next/navigation"

export default function HomePage() {
    const router = useRouter()

    const mocked = mockedProducts.slice(0, 4)

    return (
        <div className="bg-background min-h-screen">
            <Header email="" name="" count={0} />

            <section className="from-primary/10 via-primary/5 to-background border-b bg-linear-to-r">
                <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20">
                    <div className="max-w-3xl">
                        <Badge className="mb-3 sm:mb-4" variant="secondary">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Ofertas Especiais
                        </Badge>
                        <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-5xl">
                            Encontre os melhores produtos
                            <br className="hidden sm:block" />
                            <span className="text-primary">
                                {" "}
                                com os melhores preços
                            </span>
                        </h1>
                        <p className="text-muted-foreground mb-4 text-base sm:mb-6 sm:text-lg">
                            Milhares de produtos à pronta entrega. Frete grátis
                            em compras acima de R$ 200.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => router.push("/products")}
                            className="w-full sm:w-auto"
                        >
                            Ver Todas as Ofertas
                        </Button>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8 sm:py-12">
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <h2 className="text-xl font-bold sm:text-2xl">
                        Produtos em Destaque
                    </h2>
                    <Button
                        variant="link"
                        onClick={() => router.push("/products")}
                        className="text-sm sm:text-base"
                    >
                        Ver todos →
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mocked.map(product => (
                        <Card
                            key={product.id}
                            className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                            onClick={() => router.push("/products")}
                        >
                            <div className="bg-muted relative aspect-square overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform hover:scale-105"
                                />
                                <Badge
                                    className="absolute top-2 right-2"
                                    variant="secondary"
                                >
                                    Novo
                                </Badge>
                            </div>
                            <div className="p-4">
                                <p className="text-muted-foreground mb-1 text-xs">
                                    {product.category}
                                </p>
                                <h3 className="mb-2 line-clamp-2 font-semibold">
                                    {product.name}
                                </h3>
                                <div className="mb-2 flex items-center gap-1">
                                    {[...Array(4)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                    <Star className="fill-muted text-muted h-4 w-4" />
                                    <span className="text-muted-foreground ml-1 text-xs">
                                        (128)
                                    </span>
                                </div>
                                <p className="text-primary text-2xl font-bold">
                                    R$ {product.price.toFixed(2)}
                                </p>
                                <p className="mt-1 text-xs font-medium text-green-600">
                                    Frete grátis
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="bg-muted/30 border-y">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                        <Benefit
                            icon={
                                <Package className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                            }
                            title="Frete Grátis"
                            subtitle="Em compras acima de R$ 200"
                        />
                        <Benefit
                            icon={
                                <CreditCard className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                            }
                            title="Parcele sem juros"
                            subtitle="Em até 12x no cartão de crédito"
                        />
                        <Benefit
                            icon={
                                <Shield className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                            }
                            title="Compra Protegida"
                            subtitle="Seus dados sempre seguros"
                        />
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8 sm:py-12">
                <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
                    Comprar por Categoria
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                    {["Eletrônicos", "Moda", "Casa", "Acessórios"].map(
                        category => (
                            <Card
                                key={category}
                                className="cursor-pointer p-4 text-center transition-shadow hover:shadow-lg sm:p-6"
                                onClick={() =>
                                    router.push(
                                        `/products?category=${category}`
                                    )
                                }
                            >
                                <ShoppingCart className="text-primary mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                                <h3 className="text-sm font-semibold sm:text-base">
                                    {category}
                                </h3>
                            </Card>
                        )
                    )}
                </div>
            </section>
        </div>
    )
}

function Benefit({
    icon,
    title,
    subtitle
}: {
    icon: React.ReactNode
    title: string
    subtitle: string
}) {
    return (
        <div className="flex gap-3 sm:gap-4">
            <div className="shrink-0">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="mb-1 text-sm font-semibold sm:text-base">
                    {title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}
