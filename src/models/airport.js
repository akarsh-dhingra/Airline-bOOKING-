'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.belongsTo(models.City,{
      foreignKey:'cityId',
      onDelete:'cascade' 
    });
    this.hasMany(models.Flight,{
      foreignKey:'departureAirportId',
      as:'departureAirport',
      sourceKey:'code'
    });
    this.hasMany(models.Flight,{
      foreignKey:'arrivalAirportId',
      as:'arrivalAirport',
      sourceKey:'code'
    });
    }
  }
  Airport.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    code: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    address: {
      type:DataTypes.STRING,
      unique:true
    },
    cityId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};