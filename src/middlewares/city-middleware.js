import { StatusCodes } from "http-status-codes";

import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";

export function validateCreateRequest(req,res,next){
    if(!req.body.name){
        const error=new appError(['City name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse('Something went wrong while creating the city',error));
    }
    next();
}
