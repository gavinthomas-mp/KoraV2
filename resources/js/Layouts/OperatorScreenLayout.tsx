import React, { useEffect, useState, useMemo } from "react";
import AnswerPhrase from "@/components/OperatorScreen/AnswerPhrase";
import AccountInfo from "@/components/OperatorScreen/AccountInfo";
import CompanyInfo from "@/components/OperatorScreen/CompanyInfo";
import RecentCaller from "@/components/OperatorScreen/RecentCaller";
import ScriptArea from "@/components/OperatorScreen/ScriptArea";
import FooterControls from "@/components/OperatorScreen/FooterControls";
export default function OperatorScreen({ children, isOpen }: { children?: React.ReactNode, isOpen: boolean }) {
    const [isBotEscalation, setIsBotEscalation] = useState(false);
    const [callConnected, setCallConnected] = useState(false);
    const [phrase, setPhrase] = useState("Welcome to the operator screen");
    return (
        <div id="operator-screen-root" style={{
            gridTemplateAreas: `'header header header'
                                'company recentcaller script'
                                'footer footer footer'`,
            gridTemplateColumns: '1fr 1fr 2fr',
        }} className={`fixed inset-0 bg-gray-50 gap-4 ${isOpen ? "open grid z-10" : "hidden"}`}>
            <div className="header" style={{ gridArea: 'header' }}>
                <AnswerPhrase phrase={phrase} isBotEscalation={isBotEscalation} callConnected={callConnected} />
                <AccountInfo />
            </div>
            <div className="company" style={{ gridArea: 'company' }}>
                <CompanyInfo />
            </div>
            <div className="recentcaller" style={{ gridArea: 'recentcaller' }}>
                <RecentCaller />
            </div>
            <div className="script h-full overflow-auto" style={{ gridArea: 'script' }}>
                <ScriptArea />
            </div>
            <div className="footer" style={{ gridArea: 'footer' }}>
                <FooterControls />
            </div>
        </div>
    );
}