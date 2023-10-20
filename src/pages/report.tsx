import { useEffect, useState } from "react";

const Report = () => {
    useEffect(() => {
        fetch("/api/log-avatar-scroll");
    }, []);
    return <h1>report</h1>;
};

export default Report;
