import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-[#B8C7BD] bg-white px-4 py-3 text-sm text-[#1B2B22] ring-offset-white placeholder:text-[#4A6052] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D604C]/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
