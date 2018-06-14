import React from "react";

export const TestResult = ({ isFetching, data, costPerUnit, revenuePerUnit }) => {
    if (isFetching) {
        return <span>Loading...</span>
    }

    if (Object.keys(data).length <= 1) {
        return (
            <div>
                <label>Result:</label><br />
                <span>It took {data.time} seconds to finish</span>
            </div>
        );
    }
    else {
        return (
            <div>
                <label>Result till now:</label> <br />
                <span>It consumed <label>{data["input-number"]}</label> units, cost <label>${costPerUnit * data["input-number"]}</label></span><br />
                <span>It produced <label>{data["output-number"]}</label> units, got revenue of <label>$${revenuePerUnit * data['output-number']}</label></span>
                <br />
                <span>Stations</span>
                <ul>
                    {data['stations'].map(station => <li key={station.order}>Station <label>{station.order}</label> is <label>{station.status}</label>, it has stock of <label>{station.stock}</label> units</li>)}
                </ul>
            </div>
        );
    }
}