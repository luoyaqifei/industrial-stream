const _ = require('lodash');
const axios = require('axios');
import config from './config';

module.exports = {
    calculateStatus:(req,res,next)=>{
        console.log(req.body);
        let timeLimit;
        console.log(`${config.protocol}://${config.hostname}:${config.serverPort}/value-stream`)
        return axios(`${config.protocol}://${config.hostname}:${config.serverPort}/value-stream`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(req.body)
        })
        .then((response) => {
        timeLimit = response.data.time;
        console.log("time limit is: ", timeLimit);
        let timeInterval = req.body["time-interval"];
        console.log("time interval is: ", timeInterval);
        let numberUnit = req.body["number-of-units"];
        console.log("Units number is: ", numberUnit);

        let inputNumber = numberUnit;
        let stations = req.body.stations;
        let orderedSatations = _
        .chain(stations)
        .sortBy('order')
        .filter((s)=>s["seconds-per-unit"])
        .value();
        let productivityPerSatation = orderedSatations.map(i=>i["seconds-per-unit"]);

        let stationLimit = req.body.stations.map(i=>i["limit"]);
        console.log("Station limits are: ", stationLimit);

        let station_status = Array.from(Array(stations.length), (_,x) => "Idle");
        console.log("station_status are: ", station_status);

        let station_processTime =Array.from(Array(stations.length), (_,x) => 0);
        let station_stock = Array.from(Array(stations.length), (_,x) => 0);

        if(timeInterval > timeLimit)
        {
            let nArr = Array.from(Array(stations.length), (_,x) => x);
            // let buffers = Array.apply(null, {numberUnit}).map(function() {return 0});
            let stationsInfo = _.map(nArr, i=> {return {
                order: i+1,
                status: 0,
                stock: 0
            }})
            let outObj = {
                "input-number": numberUnit,
                "output-number": numberUnit,
                stations: stationsInfo
            };
            res.status(200).json(JSON.parse(JSON.stringify(outObj)));
            return res;
        }
        
        for(let t = 0; t < timeInterval; t++)
        {
            if(inputNumber > 0)
            {
                if(stationLimit[0] == null){stationLimit[0] = Number.MAX_SAFE_INTEGER;}
                if(station_status[0] == "Idle" && station_stock[0] < stationLimit[0])
                {
                    station_status[0] = "Running";
                    station_processTime[0]++;
                    inputNumber--;
                    if(station_processTime[0] >= productivityPerSatation[0])
                    {
                        station_status[0] = "Idle";
                        station_processTime[0] = 0;
                        station_stock[0]++;
                    }    
                }
                if(station_status[0] == "Running")
                {
                    station_processTime[0]++;
                    if(station_processTime[0] >= productivityPerSatation[0])
                    {
                        station_status[0] = "Idle";
                        station_processTime[0] = 0;
                        station_stock[0]++;
                    }    
                }
            }
            if(inputNumber == 0)
            {
                if(station_status[0] == "Running")
                {
                    station_processTime[0]++;
                    if(station_processTime[0] >= productivityPerSatation[0])
                    {
                        station_status[0] = "Idle";
                        station_processTime[0] = 0;
                        station_stock[0]++;
                    }    
                }
            }

            for(let i = 1; i < numberUnit; i++)
            {
                if(stationLimit[i] == null)
                stationLimit[i] = Number.MAX_SAFE_INTEGER;

                if(station_status[i] == "Idle" && station_stock[i-1] > 0 && station_stock[i] < stationLimit[i])
                {
                    station_status[i] = "Running";
                    station_processTime[i]++;
                    station_stock[i-1]--;
                    if(station_processTime[i] >= productivityPerSatation[i])
                    {
                        station_status[i] = "Idle";
                        station_processTime[i] = 0;
                        station_stock[i]++;
                    }    
                }
                if(station_status[i] == "Running")
                {
                    station_processTime[i]++;
                    if(station_processTime[i] >= productivityPerSatation[i])
                    {
                        station_status[i] = "Idle";
                        station_processTime[i] = 0;
                        station_stock[i]++;
                    }    
                }
            }
        }

        let nArr = Array.from(Array(stations.length), (_,x) => x);
        // let buffers = Array.apply(null, {numberUnit}).map(function() {return 0});
        let stationsInfo = _.map(nArr, i=> {return {
            order: i + 1,
            status: station_status[i],
            stock: station_stock[i]
        }})

        let unitsInStation = _
        .chain(station_status)
        .filter((s)=>s == "Running")
        .value();

        let totalIn = _.sum(station_stock) + unitsInStation.length;
        // let outObj = _.zipObject(_.map(stationArray, n => `Station ${n+1} Status: `), buffers);
        let outObj = {
            "input-number": totalIn,
            "output-number": station_stock[stations.length - 1],
            stations: stationsInfo
        };
        res.status(200).json(JSON.parse(JSON.stringify(outObj)));
        return res;
        })
        .catch((error) => {
            console.error(error);
        }); 


    }
};

 

 
