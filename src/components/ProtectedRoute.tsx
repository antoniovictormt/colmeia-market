import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth()
    const { push } = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            push("/auth")
        }
    }, [isAuthenticated, push])

    if (!isAuthenticated) {
        return (
            <div className="bg-background flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mb-4 flex justify-center">
                            <div className="bg-primary/10 rounded-full p-3">
                                <Lock className="text-primary h-8 w-8" />
                            </div>
                        </div>
                        <CardTitle>Acesso Restrito</CardTitle>
                        <CardDescription>
                            Você precisa estar autenticado para acessar esta
                            página
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => push("/auth")}
                            className="w-full"
                        >
                            Fazer Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <>{children}</>
}
