import { cn } from "@/lib/utils";
export const linkStyles = (link: string = '', isActive: (link: string) => boolean) => {
    return cn(
        "relative px-3 py-2 text-sm font-medium after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-transparent hover:after:bg-[#e70175] after:transition-all after:duration-300 font-bold",
        isActive(link) ? 'text-black after:bg-[#e70175]' : 'text-[rgb(119,119,119)]'
    );
}