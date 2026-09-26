import CrudRepository from "./crud-repository.js";

import db from "../models/index.js";
class AirportRepository extends CrudRepository{
     constructor(){
        super(db.Airport); 
     }
}

export default AirportRepository;