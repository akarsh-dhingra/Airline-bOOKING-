import { StatusCodes } from "http-status-codes";
import { FlightRepository } from "../repositories/index.js";
import { Op } from "sequelize";
import { appError } from "../utils/errors/app-error.js";

const flightRepository=new FlightRepository();

async function createFlight(data) {
    try {
        const flight=await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name=== 'SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new appError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new appError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(query) {
    let customFilter={};
    let sortFilter=[];
    // trips=MUM-DEL
    if(query.trips){
        let [departureId,arrivalId]=query.trips.split("-");
        if(departureId==arrivalId){
            throw new appError('DepartId and ArrivalId both cannot be same',StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId=departureId;
        customFilter.arrivalAirportId=arrivalId;
        // TODO: add a check that they are not same.
        
    }
    if(query.price){
        let [minPrice,maxPrice]=query.price.split("-");
        if(minPrice==undefined){
            customFilter.price=Number(maxPrice)
        }
        else if(maxPrice==undefined){
            customFilter.price=Number(minPrice)
        }
        // don't add if else statements use the custom op.between of sequelize in here. 
        else customFilter.price = {
            [Op.between]: [Number(minPrice), Number(maxPrice)]
        }
    }
    if(query.travellers){

        customFilter.totalSeats={
            // totalSeats.gte : query.travellers
            // totalSeats >= query.travellers

            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        // const startDate=new Date(query.tripDate+'T00:00:00.000Z');
        // const endDate=new Date(query.tripDate+'T23:59:59.999Z');
        // customFilter.departureTime={
        //     [Op.between]:[startDate,endDate]
        // }
        customFilter.departureTime={
            [Op.eq]:query.tripDate+'T00:00:00.000Z'
        }
    }
    if(query.sort){
        const params=query.sort.split(',');
        const sortfilters=params.map((p)=>p.split('_'));
        sortFilter=sortfilters;
    }
    try {
        const flights=await flightRepository.getAllflights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new appError('Cannot fetch data of all the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight=await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new appError('The flight you requested is not present',error.statusCode);
        }
        throw new appError('Cannot fetch data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response=await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        // Errors the repository raised deliberately (404, 400 not enough seats)
        // already carry a status code, so rethrow them untouched instead of
        // flattening every failure into a 500.
        if(error instanceof appError){
            throw error;
        }
        throw new appError('Cannot Update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


const flightService={createFlight,getFlights,getFlight,updateSeats};
export default flightService;


// Let's say there are 100 objects that need to go from 
// DEL - MUM 
// For 100 objects you"ll be making three separate queries , one for getting the deptAirportId , one for getting the 
// 