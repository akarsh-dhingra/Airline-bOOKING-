'use strict';
import { Model } from "sequelize";
import { SEAT_TYPE } from "../utils/common/index.js";


const {BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY}=SEAT_TYPE;
export default (sequelize, DataTypes) =>{
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane,{
        foreignKey:'airplaneId',
        as:'airplane_detail'
      })
    }
  }
  Seat.init({
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    row: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    column: {
      type:DataTypes.STRING,
      allowNull:false
    },
    type: {
      type:DataTypes.ENUM,
      values:[BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY],
      defaultValue:ECONOMY,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};