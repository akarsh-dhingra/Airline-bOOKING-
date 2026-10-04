// We will here interact with our service 

import { StatusCodes } from "http-status-codes";
import { AirportService } from "../services/index.js";
import { successResponse,errorResponse } from "../utils/common/index.js";


/**
 * POST : /airports
 * req-body {name:'IGI',cityId:5,address: , code:''}
 */


export async function createAirport(req,res) {
    const {name,code,address,cityId}=req.body;
    try {
        const airport=await AirportService.createAirport({
            name:name,
            code:code,
            address:address,
            cityId:cityId
        });
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse(airport));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot create the airport',error));
    }
}

/**
 * GET : /airports
 * req-body {}
 */

export async function getAirports(req,res) {
    try {
        const airports=await AirportService.getAirports();
        return res.status(StatusCodes.OK).json(successResponse(airports));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot fetch data of all the airport',error));
    }
}

/**
 * GET : /airports/:id 
 * req-body {}
 */

export async function getAirport(req,res){
    try {
        const airport=await AirportService.getAirport(req.params.id);
        return res.status(StatusCodes.OK).json(successResponse(airport));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot fetch data of the airport',error));
    }
}

/**
 * DELETE : /airports/:id
 * req-body {}
 */

export async function destoryAirport(req,res){
    try {
        const airport=await AirportService.destoryAirport(req.params.id);
        return res.status(StatusCodes.OK).json(successResponse(airport));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot delete the airport',error));
    }
}
