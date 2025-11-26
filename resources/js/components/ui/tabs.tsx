import * as TabsPrimitive from '@headlessui/react';
import { cn } from '@/lib/utils';
function TabGroup(props: TabsPrimitive.TabGroupProps) {
  return <TabsPrimitive.TabGroup data-slot="tab-group" {...props} />;
}

function TabList(props: TabsPrimitive.TabListProps) {
  return <TabsPrimitive.TabList className={cn('flex')} data-slot="tab-list" {...props} />;
}

function Tab(props: TabsPrimitive.TabProps) {
  return <TabsPrimitive.Tab 
    data-slot="tab"
    className={cn(
        "rounded-full px-3 py-1 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline text-[rgb(119,119,119)] after:content-[''] data-selected:text-black after:block after:h-1 data-selected:after:bg-[#e70175] after:mt-1 after:w-full after:transition-all hover:after:bg-gray-300"
    )}
    {...props} />;
}

function TabPanels(props: TabsPrimitive.TabPanelsProps) {
  return <TabsPrimitive.TabPanels data-slot="tab-panels" {...props} />;
}

function TabPanel(props: TabsPrimitive.TabPanelProps) {
  return <TabsPrimitive.TabPanel 
    data-slot="tab-panel" 
    className={cn("rounded-xl p-3")}
    {...props} />;
}

export { TabGroup, TabList, Tab, TabPanels, TabPanel };