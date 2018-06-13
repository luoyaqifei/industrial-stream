import React from "react";

export const TestResult = ({ isFetching, data }) => {
    if (isFetching) {
        return <span>Loading...</span>

    }
    return (
        <span>Result: {data.time} seconds</span>
    );
}