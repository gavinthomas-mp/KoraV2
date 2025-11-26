export default function AnswerPhrase({ phrase, isBotEscalation, callConnected }) {
    return (
        <div className="p-3 flex items-center justify-center bg-green-300 leading-0">
            {callConnected && (
                <i className="fa-regular fa-phone-xmark fa-lg alert invisible"></i>
            )}
            {isBotEscalation && (
                <div data-bot-escalation="false">
                    <div class="flex py-1 px-2 mr-2 rounded border border-white border-solid items-center justify-between gap-2 cursor-pointer bg-white/10 hover:bg-white/20 transition-all" id="escalate-bot">
                        <div class="ico"><img src="/img/bot_escalation.svg" alt="AI Escalation" /></div>
                        <div class="text-white">
                            AI Escalation
                        </div>
                    </div>
                </div>
            )}
            <span className="text-lg text-white font-bold">{phrase}</span>
        </div>
    );
}