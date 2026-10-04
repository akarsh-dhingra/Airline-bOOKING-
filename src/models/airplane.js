'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // An airplane has many seats a seat belongs to an 
    // airplane 
    
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
        foreignKey:'airplaneId',
        onDelete:'CASCADE'
      });
      this.hasMany(models.Seat,{
        foreignKey:'airplaneId',
        onDelete:'CASCADE'
      });
      // Will look for airplaneId in the codeBase -> Ans: Present in create-flight migration
    }
  }
  Airplane.init({
    modelNumber: {type:DataTypes.STRING,allowNull:false, validate:{
      isAlphanumeric:true
    }},  // we removed the defaultValue:'' as this because we don't wantec to create an airplace without a modelNumber
    
     capacity: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0,validate:{max:1000}}
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};