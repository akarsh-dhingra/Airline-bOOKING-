import { StatusCodes } from "http-status-codes";
import { CityService } from "../services/index.js";
import { successResponse,errorResponse } from "../utils/common/index.js";

export async function createCity(req,res) {
    try {
        const city=await CityService.createCity({
            name:req.body.name
        });
        return res.status(StatusCodes.CREATED).json(successResponse(city));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot create the city',error));
    }
}
