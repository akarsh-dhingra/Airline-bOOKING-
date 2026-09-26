import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
export function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        errorResponse.message="Something went wrong while creating the message"
        errorResponse.error={explaination: "Model number not found in the incoming request in the correct format"}
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }
    next();
}


