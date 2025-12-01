import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
    variants: {
        variant: {
            default: " bg-white text-black",
            highlighted: "bg-linear-to-br from-[#093C23] to-[#051B16] text-white",
        }
    }, 
    defaultVariants: {
        variant: "default",
    },
});

const pricingCardIconVariants = cva("size-5",{
    variants: {
        variant: {
            default: " fill-primary text-white",
            highlighted: "fill-white text-black",
        }
    }, 
    defaultVariants: {
        variant: "default",
    },
});

const pricingCardSecondaryTextVariants = cva("text-neutral-700",{
    variants: {
        variant: {
            default: "text-neutral-700",
            highlighted: "text-neutral-300",
        },
    }, 
});

const pricingCardBadgeVariants = cva("text-black text-xs font-normal p-1",{
    variants: {
        variant: {
            default: "bg-primary/20",
            highlighted: "bg-[#F5B797]",
        },
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
};
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
    return (
        <div className={cn(pricingCardVariants({variant}), className, "border")}>
            <div className="flex items-end gap-x-4 justify-between">
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <h6 className="font-medium text-xl">{title}</h6>
                        {badge ? (
                            <Badge className={cn(pricingCardBadgeVariants({variant}))}>
                                {badge}
                            </Badge>
                        ) : null}
                    </div>
                    <p className={cn("text-xs", pricingCardSecondaryTextVariants({variant}))}>
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
                    <span className={cn(pricingCardSecondaryTextVariants({variant}))}>
                        {priceSuffix}
                    </span>
                </div>
            </div>
            <div className="py-6">
                <Separator className="opacity-10 text-[#576d68]"></Separator>
            </div>
            <Button
                className="w-full"
                size="lg"
                variant={variant ==="highlighted" ? "default" : "outline"}
                onClick={onClick}
            >
                {buttonText}
            </Button>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="font-medium uppercase">Features</p>
                <ul
                    className={cn("flex flex-col gap-y-2.5", pricingCardSecondaryTextVariants({variant}))}
                >
                  {features.map((feature, index) => (
                     <li key={index} className="flex items-center gap-x-2.5">
                        <CircleCheckIcon className={cn(pricingCardIconVariants({variant}))} />
                        {feature}
                     </li>
                  ))}  
                </ul>

            </div>
        </div>
    )
}











// import type { SpringOptions } from 'motion/react';
// import { useRef, useState } from 'react';
// import { motion, useMotionValue, useSpring } from 'motion/react';

// interface TiltedCardProps {
//   imageSrc: React.ComponentProps<'img'>['src'];
//   altText?: string;
//   captionText?: string;
//   containerHeight?: React.CSSProperties['height'];
//   containerWidth?: React.CSSProperties['width'];
//   imageHeight?: React.CSSProperties['height'];
//   imageWidth?: React.CSSProperties['width'];
//   scaleOnHover?: number;
//   rotateAmplitude?: number;
//   showMobileWarning?: boolean;
//   showTooltip?: boolean;
//   overlayContent?: React.ReactNode;
//   displayOverlayContent?: boolean;
// }

// const springValues: SpringOptions = {
//   damping: 30,
//   stiffness: 100,
//   mass: 2
// };

// export default function TiltedCard({
//   imageSrc,
//   altText = 'Tilted card image',
//   captionText = '',
//   containerHeight = '300px',
//   containerWidth = '100%',
//   imageHeight = '300px',
//   imageWidth = '300px',
//   scaleOnHover = 1.1,
//   rotateAmplitude = 14,
//   showMobileWarning = true,
//   showTooltip = true,
//   overlayContent = null,
//   displayOverlayContent = false
// }: TiltedCardProps) {
//   const ref = useRef<HTMLElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useSpring(useMotionValue(0), springValues);
//   const rotateY = useSpring(useMotionValue(0), springValues);
//   const scale = useSpring(1, springValues);
//   const opacity = useSpring(0);
//   const rotateFigcaption = useSpring(0, {
//     stiffness: 350,
//     damping: 30,
//     mass: 1
//   });

//   const [lastY, setLastY] = useState(0);

//   function handleMouse(e: React.MouseEvent<HTMLElement>) {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left - rect.width / 2;
//     const offsetY = e.clientY - rect.top - rect.height / 2;

//     const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
//     const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

//     rotateX.set(rotationX);
//     rotateY.set(rotationY);

//     x.set(e.clientX - rect.left);
//     y.set(e.clientY - rect.top);

//     const velocityY = offsetY - lastY;
//     rotateFigcaption.set(-velocityY * 0.6);
//     setLastY(offsetY);
//   }

//   function handleMouseEnter() {
//     scale.set(scaleOnHover);
//     opacity.set(1);
//   }

//   function handleMouseLeave() {
//     opacity.set(0);
//     scale.set(1);
//     rotateX.set(0);
//     rotateY.set(0);
//     rotateFigcaption.set(0);
//   }

//   return (
//     <figure
//       ref={ref}
//       className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
//       style={{
//         height: containerHeight,
//         width: containerWidth
//       }}
//       onMouseMove={handleMouse}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {showMobileWarning && (
//         <div className="absolute top-4 text-center text-sm block sm:hidden">
//           This effect is not optimized for mobile. Check on desktop.
//         </div>
//       )}

//       <motion.div
//         className="relative [transform-style:preserve-3d]"
//         style={{
//           width: imageWidth,
//           height: imageHeight,
//           rotateX,
//           rotateY,
//           scale
//         }}
//       >
//         <motion.img
//           src={imageSrc}
//           alt={altText}
//           className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
//           style={{
//             width: imageWidth,
//             height: imageHeight
//           }}
//         />

//         {displayOverlayContent && overlayContent && (
//           <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
//             {overlayContent}
//           </motion.div>
//         )}
//       </motion.div>

//       {showTooltip && (
//         <motion.figcaption
//           className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
//           style={{
//             x,
//             y,
//             opacity,
//             rotate: rotateFigcaption
//           }}
//         >
//           {captionText}
//         </motion.figcaption>
//       )}
//     </figure>
//   );
// }
