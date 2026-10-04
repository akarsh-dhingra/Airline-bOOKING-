import { StatusCodes } from "http-status-codes";
import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";
import { appError } from "../utils/errors/app-error.js";

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

    /**
   Seat updates on the same flight can be requested at the same time, and a plain
   read-then-write lets both requests see the same `totalSeats` and both decrement
   it, overselling the flight. We take a pessimistic row lock (SELECT ... FOR UPDATE)
   so the second transaction blocks until the first commits, then re-reads the
   committed value.

   The lock is only held if it is taken on the transaction's own connection, so
   `findByPk` must receive the same `transaction` as the subsequent write, and
   Sequelize ignores `lock` entirely when no transaction is supplied.
      */
     async updateRemainingSeats(flightId,seats,dec=true){
      const transaction=await db.sequelize.transaction();
      try {
        const flight=await db.Flight.findByPk(flightId,{
           transaction,
           lock: transaction.LOCK.UPDATE
        });
        if(!flight){
           throw new appError('The flight you requested is not present',StatusCodes.NOT_FOUND);
        }
        if(dec && flight.totalSeats<seats){
           throw new appError(
              `Cannot allocate ${seats} seats, only ${flight.totalSeats} remaining`,
              StatusCodes.BAD_REQUEST
           );
        }
        // `increment`/`decrement` take a single options object, so the transaction
        // has to travel with `by` in the same argument.
        if(dec){
          await flight.decrement('totalSeats',{by:seats,transaction});
        }
        else{
          await flight.increment('totalSeats',{by:seats,transaction});
        }
        await transaction.commit();
        return flight;
      } catch(error) {
        await transaction.rollback();
        throw error;
      }
     }
} 



export default FlightRepository;
