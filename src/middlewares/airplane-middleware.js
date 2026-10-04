import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";

export function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        const error=new appError(['Model number not found in the incoming request in the correct format'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse('Something went wrong while creating the airplane',error));
    }
    next();
}
