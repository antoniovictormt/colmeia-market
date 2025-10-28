import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().trim().email({ message: "Email inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
})

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
        .max(100),
    email: z.string().trim().email({ message: "Email inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
})
