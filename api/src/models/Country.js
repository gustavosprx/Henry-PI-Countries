const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('Country',{
    id: {
      type: DataTypes.CHAR(3), 
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    flagsImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents: {
      type: DataTypes.STRING,
      allowNull:false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull:false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },{
    timestamps: false
  });
};
