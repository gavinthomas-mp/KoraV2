function TransferAndDeliver(actionContact: any) {
    const contactInfo = actionContact?.contact;
    if (!contactInfo) {
        alert('No contact information available for delivery.');
        return;
    }
}

function EmailAndDeliver(actionContact: any) {
    const contactInfo = actionContact?.contact;
    if (!contactInfo) {
        alert('No contact information available for delivery.');
        return;
    }
}

export { TransferAndDeliver, EmailAndDeliver };