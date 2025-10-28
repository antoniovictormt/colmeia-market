import { CreditCardPreview } from "@/components/CreditCardPreview"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getInstallments } from "@/functions/getInstallments"
import { CreditCardFormProps } from "@/types"

export function CreditCardForm({
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvv,
    setCardCvv,
    formatCardNumber,
    formatExpiry,
    products
}: CreditCardFormProps) {
    function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value.replace(/[^\d/]/g, "")

        const digits = raw.replace(/\D/g, "").slice(0, 4)

        let formatted = digits
        if (digits.length >= 3) {
            formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`
        }

        setCardExpiry(formatted)
    }

    return (
        <div className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
            <CreditCardPreview
                cardNumber={cardNumber}
                cardName={cardName}
                cardExpiry={cardExpiry}
            />

            <div className="space-y-2">
                <Label htmlFor="card-number" className="text-sm">
                    Número do Cartão
                </Label>
                <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    className="text-sm sm:text-base"
                    maxLength={19}
                    value={cardNumber}
                    onChange={e =>
                        setCardNumber(formatCardNumber(e.target.value))
                    }
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="card-name" className="text-sm">
                    Nome no Cartão
                </Label>
                <Input
                    id="card-name"
                    placeholder="Nome como está no cartão"
                    className="text-sm uppercase sm:text-base"
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <Label htmlFor="card-expiry" className="text-sm">
                        Validade
                    </Label>
                    <Input
                        id="card-expiry"
                        placeholder="MM/AA"
                        className="text-sm sm:text-base"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="card-cvv" className="text-sm">
                        CVV
                    </Label>
                    <Input
                        id="card-cvv"
                        type="password"
                        placeholder="123"
                        className="text-sm sm:text-base"
                        maxLength={3}
                        value={cardCvv}
                        onChange={e =>
                            setCardCvv(e.target.value.replace(/\D/g, ""))
                        }
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="card-installments" className="text-sm">
                    Parcelas
                </Label>
                <select
                    id="card-installments"
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >
                    {getInstallments(products).map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
