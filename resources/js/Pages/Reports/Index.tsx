import { useState } from "react";
import Heading from "@/components/heading";
import { Select, SelectTrigger, SelectContent, SelectItem} from "@/components/ui/select";
import AppLayout from "@/Layouts/AppLayout";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { SelectValue } from "@radix-ui/react-select";
function ReportsIndex() {
    const [toDate, setToDate] = useState<Date | undefined>(new Date());
    const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
    const [selectedReport, setSelectedReport] = useState<string | undefined>(undefined);
    return (
        <AppLayout>
            <Heading title="Reports" />
            <div className="my-4">
                <Label htmlFor="date-range">Date Range</Label>
                <Calendar 
                    id="date-range"
                    mode="range"
                    numberOfMonths={2}
                    defaultMonth={fromDate}
                    selected={fromDate && toDate ? { from: fromDate, to: toDate } : undefined}
                    onSelect={(range) => {
                        setFromDate(range?.from || undefined);
                        setToDate(range?.to || undefined);
                    }}
                    disabled={(date) => date > new Date()}
                />
            </div>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="breaks">Breaks</SelectItem>
                    <SelectItem value="call_auditing">Call Auditing</SelectItem>
                    <SelectItem value="call_evaluation">Call Evaluation</SelectItem>
                    <SelectItem value="highest_volume">Highest Volume</SelectItem>
                    <SelectItem value="incidents">Incidents</SelectItem>
                    <SelectItem value="incident_report">Incident Report</SelectItem>
                    <SelectItem value="la_orders">LA Orders</SelectItem>
                    <SelectItem value="operator_events">Operator Events</SelectItem>
                    <SelectItem value="review_requests">Review Requests</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                    <SelectItem value="company_health_dashboard">Company Health Dashboard</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="self_evaluations">Self Evaluations</SelectItem>
                </SelectContent>
            </Select>
            {selectedReport && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold capitalize">{selectedReport.replace(/_/g, ' ')}</h2>
                    <p>Report content for {selectedReport} will be displayed here.</p>
                </div>
            )}
        </AppLayout>
    )
}

export default ReportsIndex;