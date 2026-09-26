import { StatusCodes } from "http-status-codes";
import { appError } from "../utils/errors/app-error.js";

import {AirportRepository} from "../repositories/index.js";

const airportRepository=new AirportRepository();


async function createAirport(data) {
    try {
        const airport=await airportRepository.create(data);
        return airport;
    } catch (error) {
        // if(error.name =='SequelizeValidationError'){
        //     let explaination=[];

        // }
        throw new appError('Cannot Create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports=await airportRepository.getAll();
        return airports;
    } catch (error) {
         throw new appError("Cannot fetch data of all airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport=await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new appError('Cannot fetch data of this airport',StatusCodes.BAD_REQUEST);
        }
        throw new appError('Cannot fetch data of this airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destoryAirport(id){
try {
    const response=await airportRepository.destroy(id);
    return response;
} catch (error) {
    if(error.statusCode==StatusCodes.NOT_FOUND){
        throw new appError("The Airport you requested to delete is not present",error.statusCode);
    }
    throw new appError("Cannot fetch data of the requested airport",StatusCodes.INTERNAL_SERVER_ERROR);
}
}
const AirportService={createAirport,getAirports,getAirport,destoryAirport}

export default AirportService;

