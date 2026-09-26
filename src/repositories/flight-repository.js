import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";
class FlightRepository extends CrudRepository{
     constructor(){
        super(db.Flight); 
     }
     async getAllflights(filter,sort){
      const response=await db.Flight.findAll({
         where: filter,
         order:sort,
         include:
         [
            {
               model: db.Airplane,
               required: true,
               as:'airplane_detail'
             },{
               model:db.Airport,
               as:'departureAirport',
               required:true,
               include:[{model:db.City,required:true}]
             },{
               model:db.Airport,
               as:'arrivalAirport',
               required:true,
               include:[{model:db.City,required:true}]
             }
            ]
      });
      return response;
     }
}

export default FlightRepository;