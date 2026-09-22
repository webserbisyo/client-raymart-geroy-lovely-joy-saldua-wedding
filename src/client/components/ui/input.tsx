import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-[#B8C7BD] bg-white px-4 py-3 text-sm text-[#1B2B22] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#1B2B22] placeholder:text-[#4A6052] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D604C]/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
