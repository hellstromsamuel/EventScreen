import { cn } from "@/lib/tailwind/cn";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
}

function Spinner({ className }: Props) {
  return (
    <div className={cn(className)}>
      <Loader2 className={cn("animate-spin")} />
    </div>
  );
}

export default Spinner;
