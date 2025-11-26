import React, { useEffect, useState, JSX, useContext } from "react";
import OperatorScreenLayout from "@/Layouts/OperatorScreenLayout";
import { WorkerContext } from "@/Layouts/AppLayout";

export default function OperatorScreen(): JSX.Element {
    const { operatorScreenOpen } = useContext(WorkerContext);

    return (
        <OperatorScreenLayout isOpen={operatorScreenOpen} />
    );
}