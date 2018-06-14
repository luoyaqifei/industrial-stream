import React from "react";

export const TestResult = ({ isFetching, data }) => {
    if (isFetching) {
        return <span>Loading...</span>
    }

    if (Object.keys(data).length <= 1) {
        return (
            <div>
                <label>Result:</label><br/>
                <span>It took {data.time} seconds to finish</span>
            </div>
        );
    }
    else {
        return (
            <div>
                <label>Result:</label> <br/>
                <span>It produced {data["output-number"]} units till now</span>
                <span>Stations</span>
                <ul>
                    {data['stations'].map(station=> <li key={station.order}>Station {station.order} is {station.status}, it has stock of {station.stock} units</li>)}

                </ul>
            </div>
            );
    }
}