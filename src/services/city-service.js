import { StatusCodes } from "http-status-codes";
import { CityRepository } from "../repositories/index.js";

import { appError } from "../utils/errors/app-error.js";

const cityRepository=new CityRepository();

async function createCity(data){
    try {
        const city=await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new appError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new appError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


const cityService={createCity};

export default cityService;

