// We will here interact with our service 
import { AirplaneService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import { successResponse,errorResponse } from "../utils/common/index.js";

export async function createAirplane(req,res) {
    const {modelNumber,capacity}=req.body;

        try {
            const airplane=await AirplaneService.createAirplane({
                modelNumber:modelNumber,
                capacity:capacity
            })
            return res.status(StatusCodes.ACCEPTED)
                    .json(successResponse(airplane));
        } catch (error) {
                return res.status(error.statusCode).json(errorResponse('Cannot create the airplane',error))
        }
}

/**
 * POST : /airplanes/:id 
 * req-body {}
 */

export async function getAirplanes(req,res) {
    try {
        const airplanes=await AirplaneService.getAirplanes();
        return res.
                status(StatusCodes.OK)
                .json(successResponse(airplanes));
    } catch (error) {
        return res.
                status(error.statusCode)
                .json(errorResponse('Cannot fetch data of all the airplane',error));
    }
}

export async function getAirplane(req,res) {
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
        return res.
                status(StatusCodes.OK)
                .json(successResponse(airplane));
    } catch (error) {
        return res.
                status(error.statusCode)
                .json(errorResponse('Cannot fetch data of the airplane',error));
    }
}

export async function destroyAirplane(req, res) {
    try {
        const airplanes = await AirplaneService.destroyAirplane(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(successResponse(airplanes));
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(errorResponse('Cannot delete the airplane',error));
    }
}
