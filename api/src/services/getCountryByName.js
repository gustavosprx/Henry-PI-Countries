const { Country } = require('../db')
const { Sequelize } = require('sequelize');

const CountryByName = async (nameCountry) => {
    
        try {
         
          const name = nameCountry.toLowerCase();
          const country = await Country.findAll({
            where: {
              name: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("name")),
                "LIKE",
                "%" + name + "%"
              ),
            },
            raw: true,
          });
      
          Promise.all(country);
          if (country.length > 0) {
            return country;
          }
          return 'No se encontro el país';
        } catch (error) {
          console.log(error);
          throw error;
        }
      };

module.exports = { CountryByName }