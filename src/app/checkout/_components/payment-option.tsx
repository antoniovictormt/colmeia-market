import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { PaymentOptionProps } from "@/types"

export function PaymentOption({
    id,
    value,
    icon,
    title,
    description
}: PaymentOptionProps) {
    return (
        <div className="hover:bg-muted/50 flex cursor-pointer items-center space-x-2 rounded-lg border p-3 sm:p-4">
            <RadioGroupItem value={value} id={id} />
            <Label
                htmlFor={id}
                className="flex flex-1 cursor-pointer items-center gap-2 sm:gap-3"
            >
                {icon}
                <div>
                    <div className="text-sm font-semibold sm:text-base">
                        {title}
                    </div>
                    <div className="text-muted-foreground text-xs sm:text-sm">
                        {description}
                    </div>
                </div>
            </Label>
        </div>
    )
}
