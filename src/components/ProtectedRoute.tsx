import { ReactNode, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

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
    }, [isAuthenticated])

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
