import { CircleCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type VariantProps, cva } from "class-variance-authority";

// Keep cva for type inference only — actual background applied via inline style
const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
    variants: {
        variant: {
            default: "",
            highlighted: "text-white",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
    badge?: string | null;
    price: number;
    features: string[];
    title: string | null;
    description?: string | null;
    priceSuffix?: string;
    className?: string;
    buttonText: string;
    onClick: () => void;
}

export const PricingCard = ({
    variant,
    badge,
    price,
    features,
    title,
    description,
    priceSuffix,
    className,
    buttonText,
    onClick,
}: Props) => {
    const isHighlighted = variant === "highlighted";

    const cardStyle: React.CSSProperties = isHighlighted
        ? { background: "linear-gradient(to bottom right, #093C23, #051B16)", color: "white" }
        : { background: "white", color: "black" };

    const secondaryColor = isHighlighted ? "#d4d4d4" : "#525252";

    const iconStyle: React.CSSProperties = {
        width: "20px",
        height: "20px",
        fill: isHighlighted ? "white" : "oklch(0.63 0.1699 149.21)",
        color: isHighlighted ? "#051B16" : "white",
        flexShrink: 0,
    };

    const badgeStyle: React.CSSProperties = isHighlighted
        ? { background: "#F5B797", color: "#000" }
        : { background: "rgba(34,197,94,0.18)", color: "#000" };

    return (
        <div
            className={cn("rounded-lg p-4 py-6 w-full border", className)}
            style={cardStyle}
        >
            {/* Header */}
            <div className="flex items-end gap-x-4 justify-between">
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <h6 className="font-medium text-xl">{title}</h6>
                        {badge ? (
                            <Badge className="text-xs font-normal p-1" style={badgeStyle}>
                                {badge}
                            </Badge>
                        ) : null}
                    </div>
                    <p className="text-xs" style={{ color: secondaryColor }}>
                        {description}
                    </p>
                </div>
                <div className="flex items-end shrink-0 gap-x-0.5">
                    <h4 className="text-3xl font-medium">
                        {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                        }).format(price)}
                    </h4>
                    <span style={{ color: secondaryColor }}>{priceSuffix}</span>
                </div>
            </div>

            {/* Separator */}
            <div className="py-6">
                <Separator style={{ opacity: 0.12 }} />
            </div>

            {/* CTA button */}
            <Button
                className="w-full"
                size="lg"
                variant={isHighlighted ? "default" : "outline"}
                onClick={onClick}
            >
                {buttonText}
            </Button>

            {/* Features list */}
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="font-medium uppercase">Features</p>
                <ul className="flex flex-col gap-y-2.5" style={{ color: secondaryColor }}>
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-x-2.5">
                            <CircleCheckIcon style={iconStyle} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
