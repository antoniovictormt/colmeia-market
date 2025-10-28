"use client"

import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { mockedProducts } from "@/data/products"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Product } from "@/types"

import { ShoppingCart, Star, SlidersHorizontal } from "lucide-react"
import { addToCartServer } from "./action"

export function ProductsContent() {
    const searchParams = useSearchParams()

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000])
    const [searchQuery, setSearchQuery] = useState("")

    const categories = Array.from(new Set(mockedProducts.map(p => p.category)))
    const maxPrice = Math.max(...mockedProducts.map(p => p.price))

    useEffect(() => {
        const category = searchParams.get("category")
        const search = searchParams.get("search")
        if (category) setSelectedCategories([category])
        if (search) setSearchQuery(search)
    }, [searchParams])

    const filteredProducts = mockedProducts.filter(product => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category)
        const matchesPrice =
            product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesSearch =
            searchQuery === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())

        return matchesCategory && matchesPrice && matchesSearch
    })

    async function handleAddToCart(product: Product) {
        try {
            await addToCartServer([{ product, quantity: 1 }])
            toast.success(`${product.name} foi adicionado ao carrinho!`)
        } catch (error) {
            console.error(error)
            toast.error("Não foi possível adicionar o produto ao carrinho.")
        }
    }

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const FilterPanel = () => (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 font-semibold">Categorias</h3>
                <div className="space-y-3">
                    {categories.map(category => (
                        <div
                            key={category}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label
                                htmlFor={category}
                                className="cursor-pointer"
                            >
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-4 font-semibold">Faixa de Preço</h3>
                <Slider
                    min={0}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                />
                <div className="text-muted-foreground flex justify-between text-sm">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, maxPrice])
                    setSearchQuery("")
                }}
            >
                Limpar Filtros
            </Button>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        {searchQuery
                            ? `Resultados para "${searchQuery}"`
                            : "Todos os Produtos"}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {filteredProducts.length} produtos encontrados
                    </p>
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Filtros</SheetTitle>
                            <SheetDescription>
                                Refine sua busca por categoria e preço
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                            <FilterPanel />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex gap-6">
                {/* Desktop Sidebar */}
                <aside className="hidden w-64 shrink-0 md:block">
                    <Card className="sticky top-20 p-6">
                        <FilterPanel />
                    </Card>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <Card className="p-12 text-center">
                            <p className="text-muted-foreground">
                                Nenhum produto encontrado com os filtros
                                selecionados.
                            </p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map(product => (
                                <Card
                                    key={product.id}
                                    className="overflow-hidden transition-shadow hover:shadow-lg"
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
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-2 line-clamp-2 min-h-12 font-semibold">
                                            {product.name}
                                        </h3>
                                        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                                            {product.description}
                                        </p>
                                        <div className="mb-3 flex items-center gap-1">
                                            {[...Array(4)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                            <Star className="fill-muted text-muted h-4 w-4" />
                                            <span className="text-muted-foreground ml-1 text-xs">
                                                (4.0)
                                            </span>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-primary text-2xl font-bold">
                                                    R${" "}
                                                    {product.price.toFixed(2)}
                                                </p>
                                                <p className="text-xs font-medium text-green-600">
                                                    ou 12x de R${" "}
                                                    {(
                                                        product.price / 12
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    handleAddToCart(product)
                                                }
                                                size="sm"
                                            >
                                                <ShoppingCart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
