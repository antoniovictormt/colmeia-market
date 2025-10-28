"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loginSchema, registerSchema } from "./schema"
import { loginAction, registerAction } from "./action"
import z from "zod"

export default function AuthPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const validated = loginSchema.parse({ email, password })
            const result = await loginAction(
                validated.email,
                validated.password
            )
            if (result?.ok) {
                toast.success("Login realizado com sucesso!")
                router.push("/products")
            } else {
                toast.error("Credenciais inválidas.")
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                toast.error(err.message)
            } else {
                toast.error("Erro ao fazer login.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const validated = registerSchema.parse({ name, email, password })
            const result = await registerAction(
                validated.name,
                validated.email,
                validated.password
            )
            if (result?.ok) {
                toast.success("Cadastro realizado com sucesso!")
                router.push("/products")
            } else {
                toast.error("Erro ao cadastrar.")
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                toast.error(err.message)
            } else {
                toast.error("Erro ao fazer cadastro.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="from-primary/10 via-background to-accent/10 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="bg-primary rounded-full p-3">
                            <ShoppingBag className="text-primary-foreground h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Bem-vindo
                    </CardTitle>
                    <CardDescription>
                        Entre ou crie sua conta para continuar
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Entrar</TabsTrigger>
                            <TabsTrigger value="register">
                                Cadastrar
                            </TabsTrigger>
                        </TabsList>

                        {/* 🔹 LOGIN TAB */}
                        <TabsContent value="login">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Entrando..." : "Entrar"}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* 🔹 REGISTER TAB */}
                        <TabsContent value="register">
                            <form
                                onSubmit={handleRegister}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Seu nome"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">
                                        Email
                                    </Label>
                                    <Input
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">
                                        Senha
                                    </Label>
                                    <Input
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
