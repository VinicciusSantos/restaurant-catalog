import { cn } from "@presentation/utils/shadcn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-stone-100", className)}
      {...props}
    />
  )
}

export { Skeleton }
