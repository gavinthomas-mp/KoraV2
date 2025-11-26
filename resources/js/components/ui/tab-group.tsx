import * as React from 'react';
import { useEffect, useState } from 'react';

function TabGroup({ children, className, ...props }: React.ComponentProps<'div'>) {
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = React.Children.toArray(children).filter(
        (child: any) => child.type.displayName === 'Tab'
    ) as React.ReactElement[];

    const tabPanels = React.Children.toArray(children).filter(
        (child: any) => child.type.displayName === 'TabPanel'
    ) as React.ReactElement[];

    return (
        <div className={className} {...props}>
            <div className="tab-list flex border-b border-gray-300">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab cursor-pointer px-4 py-2 ${
                            activeTab === index
                                ? 'border-b-2 border-blue-500 font-semibold'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.title}
                    </div>
                ))}
            </div>
            <div className="tab-panels mt-4">
                {tabPanels[activeTab]}
            </div>
        </div>
    );
}

function Tab({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
Tab.displayName = 'Tab';

function TabPanel({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}
TabPanel.displayName = 'TabPanel';

export { TabGroup, Tab, TabPanel };