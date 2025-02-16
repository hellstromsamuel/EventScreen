import { cn } from "@/lib/tailwind/cn";
import Spinner from "../Spinner/Spinner";

const style =
  "px-4 h-16 w-full text-lg font-semibold border-2 rounded-2xl bg-white flex flex-wrap items-center justify-center";
const hoverStyle = "transition hover:border-blue-500";
const activeStyle = "border-blue-500 text-blue-500 bg-blue-100";
const disabledStyle = "opacity-50 cursor-not-allowed";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isLoading?: boolean;
  className?: string;
}

function Button({ children, onClick, isActive, isLoading, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        style,
        hoverStyle,
        isActive && activeStyle,
        isLoading && disabledStyle,
        className
      )}
    >
      {children}
      {isLoading && <Spinner className="ml-2" />}
    </button>
  );
}

export default Button;
