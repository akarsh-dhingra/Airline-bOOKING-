import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";

export function validateCreateRequest(req,res,next){
    const required=['flightNumber','airplaneId','departureAirportId','arrivalAirportId',
                    'arrivalTime','departureTime','price','totalSeats'];
    const explaination=required
            .filter((field)=>!req.body[field])
            .map((field)=>`${field} not found in the incoming request in the correct form`);

    if(explaination.length){
        const error=new appError(explaination,StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse('Something went wrong while creating flight',error));
    }
    next();
}

// /api/v1/flights/:id/seats

export function validateUpdateSeatsRequest(req, res, next) {
    const { id } = req.params;
    const { seats, dec } = req.body;
    const explaination=[];

    // The flight is addressed by the URL, so the id comes from req.params.
    // Trusting a body `flightId` would let /flights/1/seats update flight 40.
    if(!id || !/^\d+$/.test(id)){
        explaination.push('id must be a positive integer in the url path');
    }
    if(typeof seats!=='number' || !Number.isInteger(seats) || seats<1){
        explaination.push('seats must be a positive integer');
    }
    // `dec` is a boolean switch. A number like 3 is truthy, so accepting it
    // silently turns a typo into a decrement rather than rejecting the request.
    if(typeof dec!=='boolean'){
        explaination.push('dec must be a boolean');
    }

    if(explaination.length){
        const error=new appError(explaination,StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse('Something went wrong while updating seats of the flight',error));
    }

    // Normalise so the layers below always receive numbers, not strings.
    req.params.id=Number(id);
    next();
}
