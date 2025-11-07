"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Size and shape
        "size-4 shrink-0 rounded-[4px]",
        // Base border/background
        "border border-gray-300 bg-white",
        // Transitions
        "transition-colors outline-none",
        // Focus ring (theme-colored)
        "focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        // Checked state uses your theme colors
        "data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary data-[state=checked]:text-white",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
