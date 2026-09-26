// We will here interact with our service 

import { StatusCodes } from "http-status-codes";
import successResponse from "../utils/common/success-response.js";
import errorResponse from "../utils/common/error-response.js";
import {AirportService} from "../services/index.js";


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
        successResponse.data=airport;
        return res 
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

/**
 * GET : /airports
 * req-body {}
 */

export async function getAirports(req,res) {
    try {
        const airports=await AirportService.getAirports();
        successResponse.data=airports;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

/**
 * POST : /airports/:id 
 * req-body {}
 */

export async function getAirport(req,res){
    try {
        const airport=await AirportService.getAirport(req.params.id);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(error.StatusCode).json(errorResponse);
    }
}

/**
 * DELETE : /airports/:id
 * req-body {}
 */

export async function destoryAirport(req,res){
    try {
        const airport=await AirportService.destoryAirport(req.params.id);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(error.StatusCode).json(errorResponse);
    }
}


