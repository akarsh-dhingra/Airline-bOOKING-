import CrudRepository from "./crud-repository.js";

import db from "../models/index.js";
class AirplaneRepository extends CrudRepository{
     constructor(){
        super(db.Airplane); 
     }
}

export default AirplaneRepository;