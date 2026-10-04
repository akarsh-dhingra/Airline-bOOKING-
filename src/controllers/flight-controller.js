import { StatusCodes } from "http-status-codes";
import { successResponse,errorResponse } from "../utils/common/index.js";
import { flightService } from "../services/index.js";

/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */

export async function createFlight(req,res) {
    try {
        const flight=await flightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        return res
                .status(StatusCodes.CREATED).json(successResponse(flight));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot create the flight',error));
    }
}

export async function getAllFlights(req,res) {
    try {
        const flights=await flightService.getFlights(req.query);
        return res.status(StatusCodes.OK).json(successResponse(flights));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot fetch data of all the flight',error));
    }
}

// Create a flight and Get a particular flight details 

export async function getFlight(req,res) {
   try {
        const flight=await flightService.getFlight(req.params.id);
        return res.status(StatusCodes.OK).json(successResponse(flight));
   } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot fetch data of the flight',error));
   } 
}


/**
 * PATCH : /flights/:id/seats
 * The flight is identified by the url, never by a `flightId` in the body,
 * otherwise the two could disagree and the wrong flight would be updated.
 * req-body { seats: 2, dec: true }
 */

export async function updateSeats(req,res) {
    try {
        const response=await flightService.updateSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        });
        return res.status(StatusCodes.OK).json(successResponse(response));
    } catch (error) {
        return res.status(error.statusCode).json(errorResponse('Cannot update seats of the flight',error));
    }
}

// We want to decrease the number of seats available inside a flight
