import CrudRepository from "./crud-repository.js";

import db from "../models/index.js";
class CityRepository extends CrudRepository{
     constructor(){
        super(db.City); 
     }
}

export default CityRepository;