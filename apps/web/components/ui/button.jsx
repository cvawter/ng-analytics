import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-br from-[#f0a500] to-[#e05c00] text-white shadow-[0_0_15px_rgba(240,165,0,0.3)] hover:shadow-[0_0_20px_rgba(240,165,0,0.5)] border-0",
    outline: "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#f0a500]/50 text-[#c8cdd8] hover:text-[#eef0f4]",
  }
  const sizes = {
    default: "h-10 px-4 py-2",
  }
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
