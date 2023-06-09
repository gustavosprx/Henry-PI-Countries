const { Country,Activity } = require('../db')

const CountryById = async (id) => {

    try{    
        
   const idFormated = id.toUpperCase() 
   const detailCountry = await Country.findOne({
       where:{
           id: idFormated
       },
       include: {
              model: Activity,
              attributes: ["name", "difficulty", "duration", "season"],
              through: {
                  attributes: [],
              }
          },
   });
  
  return detailCountry
  } catch(error) {
      console.log(error)
  }

}

module.exports = { CountryById }