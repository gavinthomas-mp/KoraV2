import { cva } from "class-variance-authority";
import { cn  } from "@/lib/utils";

const existingCallerVariants = cva(
    "font-bold text-xs rounded-md border border-solid py-1 px-3",
    {
        variants: {
            existing: {
                true: "bg-gray-100 text-gray-800 border-gray-400",
                false: "bg-green-100 text-green-800 border-green-400",
            },
        },
        defaultVariants: {
            existing: false,
        },
    }
);

function ExistingCaller({existingCaller, ...props}: {existingCaller?: boolean} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                existingCallerVariants({ existing: existingCaller ?? false })
            )}
            {...props}
        >
            {existingCaller ? "Existing Caller" : "New Caller"}
        </div>
    );
}

export { ExistingCaller };