import { StatusCodes } from "http-status-codes";
import { AirplaneRepository } from "../repositories/index.js";
import { appError } from "../utils/errors/app-error.js";

const airplnaeRepository=new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane=await airplnaeRepository.create(data);
        return airplane;
} catch (error) {
        console.log("REAL ERROR:", error);
        throw new appError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes=await airplnaeRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new appError("Cannot Fetch data of all the Airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * 
 * GET: /airplane/:id
 * req.body {}
 */

async function getAirplane(id){
    try {
        const airplanes=await airplnaeRepository.get(id);
        return airplanes;
    } catch (error) {
       if (error.statusCode==StatusCodes.NOT_FOUND){
        throw new appError("The airplane you requested is not present",error.statusCode);
       }
        throw new appError("Cannot fetch data of this airplane",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * 
 * DELETE: /airplane/:id
 * req.body {}
 */


async function destroyAirplane(id) {
 try {
    const response=await airplnaeRepository.destroy(id);
    return response;
 } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new appError("The Airplane you requested to delete is not present",error.statusCode);
    }
    throw new appError("Cannot fetch Data of all Airplanes",StatusCodes.INTERNAL_SERVER_ERROR);
 }   
}

const AirplaneService={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}

export default AirplaneService;