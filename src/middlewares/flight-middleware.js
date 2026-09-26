import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";

export function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        errorResponse.message='Something went wrong while creating flight';
        errorResponse.error=new appError(['flightNumber cannot be found in the incoming requ in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.airplaneId){
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['airplaneId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.departureAirportId) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['departureAirportId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.arrivalAirportId) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['departureAirportId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.arrivalTime) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['arrivalTime not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.departureTime) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['departureTime not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.price) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['price not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    if(!req.body.totalSeats) {
        errorResponse.message = 'Something went wrong while creating flight';
        errorResponse.error = new appError(['totalSeats not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse);
    }
    next();
}