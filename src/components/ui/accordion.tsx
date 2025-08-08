"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Accordion({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("divide-y divide-white/10", className)}>{children}</div>
}

export function AccordionItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  return <div className={cn("py-2", className)} data-value={value}>{children}</div>
}

export function AccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <summary
      className={cn(
        "list-none cursor-pointer flex items-center justify-between py-4 text-ink font-medium",
        "hover:text-ink"
      )}
    >
      <span>{children}</span>
      <ChevronDown className="h-5 w-5 text-ink/70 transition-transform duration-200 group-open:rotate-180" />
    </summary>
  )
}

export function AccordionContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("pb-4 text-ink/80", className)}>{children}</div>
}
