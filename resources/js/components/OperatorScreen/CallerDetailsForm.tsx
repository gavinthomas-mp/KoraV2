import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@headlessui/react";

interface CallerDetailsFormProps {
    setExistingCaller: (value: boolean) => void;
}

const CallerDetailsForm: React.FC<CallerDetailsFormProps> = ({ setExistingCaller }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission and checking for existing caller
        if (data.phone === "1234567890") {
            setExistingCaller(true);
        } else {
            setExistingCaller(false);
            post("/submit-caller-details", {
                onSuccess: () => {
                    console.log("Form submitted successfully");
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>First and Last Name</Label>
                <Input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="mt-1 block w-full"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
            </div>
            <div>
                <Label>Phone Number</Label>
                <Input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>
            <div>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>
            <div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    value={data.company}
                    onChange={(e) => setData("company", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.company && <p className="text-red-600 text-sm">{errors.company}</p>}
            </div>
            <div>
                <Label>Address</Label>
                <Textarea
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
            </div>
        </form>
    );
}

export { CallerDetailsForm };