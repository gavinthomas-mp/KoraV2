import { HomeWidgets } from '@/components/OperatorScreen/HomeWidgets';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ activeCalls, stats }: { activeCalls: any[]; stats: any }) {
    return (
        <AppLayout>
            <HomeWidgets />
        </AppLayout>
    );
}