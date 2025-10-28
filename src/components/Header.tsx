"use client"

import { Moon, Search, ShoppingCart, Sun, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { HeaderProps } from "@/types"

export const Header = ({ email, name, count }: HeaderProps) => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [searchQuery, setSearchQuery] = useState("")

    const isAuthenticated = !!email

    const handleLogout = async () => {
        router.push("/logout")
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex h-14 items-center justify-between gap-2 sm:h-16 sm:gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg sm:h-8 sm:w-8">
                            <ShoppingCart className="text-primary-foreground h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <span className="xs:inline hidden text-base font-bold sm:text-xl">
                            colmeia-market
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden max-w-2xl flex-1 sm:flex"
                    >
                        <div className="relative w-full">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                type="search"
                                placeholder="Buscar produtos..."
                                className="w-full pl-10"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Alternar tema</span>
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {isAuthenticated ? (
                                    <>
                                        <DropdownMenuItem disabled>
                                            <span className="font-medium">
                                                {name}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push("/products")
                                            }
                                        >
                                            Meus Pedidos
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            Sair
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem
                                            onClick={() => router.push("/auth")}
                                        >
                                            Entrar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(
                                                    "/auth?register=true"
                                                )
                                            }
                                        >
                                            Criar conta
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Cart Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={() => router.push("/checkout")}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {count > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                                >
                                    {count}
                                </Badge>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Categories Nav - Mobile Hidden */}
                <nav className="hidden gap-6 border-t py-3 text-sm md:flex">
                    {[
                        "Todos os Produtos",
                        "Eletrônicos",
                        "Moda",
                        "Casa",
                        "Acessórios"
                    ].map(cat => (
                        <Link
                            key={cat}
                            href={
                                cat === "Todos os Produtos"
                                    ? "/products"
                                    : `/products?category=${cat}`
                            }
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
