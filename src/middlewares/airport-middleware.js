import { StatusCodes } from "http-status-codes";

import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";
export function validateCreateRequest(req,res,next){
    if(!req.body.name){
        errorResponse.message='Something went wrong while creating airport';
        errorResponse.error=new appError(['name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.code){
        errorResponse.message='Something went wrong while creating airport';
        errorResponse.error=new appError(['airport code not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.cityId){
        errorResponse.message='Something went wrong while creating airport';
        errorResponse.error=new appError(['City id not found in the correct form in the incoming request'],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}
