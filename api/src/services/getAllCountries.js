const axios = require('axios')
const { Country, Activity } = require('../db')

const getAllCountriesApi = async () => {

    try {

        const api = await axios.get('https://restcountries.com/v3/all')
        const apiData = api.data

        const apiDataOk = apiData?.map(async element => {
            return Country.findOrCreate({
                where: {
                    id: element.cca3,
                    name: element.name['common'],
                    flagsImage: element.flags[0],
                    continents: element.continents[0],
                    capital: element.capital !== undefined ? element.capital[0] : 'No esta definido su Capital',
                    subregion: element.subregion !== undefined ? element.subregion : 'No esta definido su Subregion',
                    area: element.area,
                    population: element.population,
                },
                row: false
            });
        })

        return await Promise.all(apiDataOk)



    } catch (err) {
        console.log(err)
    }
}

const getAllCountriesDb = async function () {

    try {
        await getAllCountriesApi()
        
        const getCountries = await Country.findAll({  
            attributes: ['id', 'name', 'flagsImage', 'continents', "population"],
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }
        })
        return getCountries

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllCountriesApi,
    getAllCountriesDb
}