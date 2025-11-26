import { usePage } from "@inertiajs/react";

function HomeWidgets() {
    const widgets: any[] = usePage().props.widgets;
    // If there are less than 5 widgets, fill the rest with empty widgets
    while (widgets.length < 5) {
        widgets.push({ 
            title: "Empty Widget", 
            content: "No widget available.",
            link: "#"
        });
    }
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 2xl:gap-6 w-full max-h-[400px] xl:max-h-[464px] 2xl:max-h-[600px] relative">
            {widgets.map((widget: any, index: number) => (
                <a href={widget.link} key={index} className={`p-4 border rounded shadow relative w-full flex flex-col items-center justify-center  ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1 h-48 xl:h-56 2xl:h-72'}`}>
                    {widget.image && (
                        <img src={widget.image.url} alt={widget.image.alt} className="mb-4 max-h-16 2xl:max-h-20 object-contain" />
                    )}
                    <h2 className="text-xl font-bold mb-2">{widget.title}</h2>
                    <p>{widget.content}</p>
                </a>
            ))}
        </div>
    );
}

export { HomeWidgets };