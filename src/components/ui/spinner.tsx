import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label="Loading" className={cn("motion-safe:transition-[transform,opacity,color,background-color,border-color,box-shadow] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none", "size-4 motion-safe:animate-spin motion-reduce:animate-none", className)} {...props} />
  )
}

export { Spinner }
