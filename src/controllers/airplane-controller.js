// We will here interact with our service 
import { AirplaneService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";
import successResponse from "../utils/common/success-response.js";
import errorResponse from "../utils/common/error-response.js";
export async function createAirplane(req,res) {
    const {modelNumber,capacity}=req.body;

        try {
            const airplane=await AirplaneService.createAirplane({
                modelNumber:modelNumber,
                capacity:capacity
            })
            successResponse.data=airplane
            return res.status(StatusCodes.ACCEPTED)
                    .json(successResponse);
        } catch (error) {
                errorResponse.error=error
                return res.status(error.statusCode).json(errorResponse)
        }
}

/**
 * POST : /airplanes/:id 
 * req-body {}
 */

export async function getAirplanes(req,res) {
    try {
        const airplanes=await AirplaneService.getAirplanes();
        successResponse.data=airplanes;
        return res.
                status(StatusCodes.OK)
                .json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.
                status(error.statusCode)
                .json(errorResponse);
    }
}

export async function getAirplane(req,res) {
    try {
        const airplanes=await AirplaneService.getAirplane(req.params.id);
        successResponse.data=airplanes;
        return res.
                status(StatusCodes.OK)
                .json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.
                status(error.statusCode)
                .json(errorResponse);
    }
}

export async function destroyAirplane(req, res) {
    try {
        const airplanes = await AirplaneService.destroyAirplane(req.params.id);
        successResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        errorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(errorResponse);
    }
}

// async function getAirplanes(req,res) {
//     try {
//         const airplanes=await AirplaneService({})
//     } catch (error) {
        
//     }
// }