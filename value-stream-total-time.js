const _ = require('lodash');

module.exports = {
    calculateTime:(req,res,next)=>{
        console.log(req.body);
        
        let numberUnit = req.body["number-of-units"];
        let stations = req.body.stations;
        let productivityPerSatation = req.body.stations.map(i=>i["seconds-per-unit"]);
        console.log("productivityPerSatation",productivityPerSatation);
        if(numberUnit == 1) {
            res.status(200).json(JSON.parse(JSON.stringify({"time": _.sum(productivityPerSatation)})));
            return res;
        }

        let minProductivity = _.maxBy(productivityPerSatation);
        console.log("minProductivity",minProductivity);

        let minProductivityOrder = _.find(stations, {'seconds-per-unit':minProductivity}).order;
        console.log("minProductivityOrder",minProductivityOrder);

        let prefixStations = _
        .chain(stations)
        .sortBy('order')
        .filter((s)=>s.order<minProductivityOrder)
        .value();
        let suffixStations = _
        .chain(stations)
        .sortBy('order')
        .filter((s)=>s.order>minProductivityOrder)
        .value();
        console.log("prefixStations",prefixStations);

        let timeUsed = _.sum(prefixStations.map(i=>i["seconds-per-unit"])) + numberUnit * minProductivity + _.sum(suffixStations.map(i=>i["seconds-per-unit"]));
        console.log('timused', timeUsed);
        res.status(200).json(JSON.parse(JSON.stringify({"time": timeUsed})));
        return res;

    }
};