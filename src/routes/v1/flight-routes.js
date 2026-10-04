import express from "express";

import { flightMiddleware } from "../../middlewares/index.js";

import { flightController } from "../../controllers/index.js";

const router=express.Router();

// /api/v1/flights POST
router.post("/",flightMiddleware.validateCreateRequest,flightController.createFlight);

// /api/v1/flights?trips=MUM-DEL

router.get("/",flightController.getAllFlights);

// /api/v1/flights/:id GET
router.get("/:id",flightController.getFlight);

// /api/v1/flights/:id/seats PATCH I want to update the seat of these filight
router.patch("/:id/seats",flightMiddleware.validateUpdateSeatsRequest,flightController.updateSeats);


export default router;