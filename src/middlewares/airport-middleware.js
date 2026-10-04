import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/index.js";
import { appError } from "../utils/errors/app-error.js";

export function validateCreateRequest(req,res,next){
    const required=['name','code','cityId'];
    const explaination=required
            .filter((field)=>!req.body[field])
            .map((field)=>`${field} not found in the incoming request in the correct form`);

    if(explaination.length){
        const error=new appError(explaination,StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse('Something went wrong while creating airport',error));
    }
    next();
}
