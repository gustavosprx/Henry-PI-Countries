const { getAllCountriesDb } = require('../services/getAllCountries')
const { CountryById } = require('../services/getCountryById')
const { CountryByName } = require('../services/getCountryByName')

const getAllCountries = async (req, res, next) => { 

    if (!req.params.id && !req.query.name) {
        const countries = await getAllCountriesDb()

        if (countries.length > 0) {
            res.status(200).send(countries)
        } else {
            res.status(404).send('Not Found');
        }

    } else {
        next()
    }
}

const getCountryById = async (req, res, next) => {
    if (req.params.id && !req.query.name) {
        const data = await CountryById(req.params.id)      
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send('Not Found');
        }
    } else {
        next()
    }
}

const getCountryByName = async (req, res, next) => {

    if (!req.params.id && req.query.name) {
        const data = await CountryByName(req.query.name)
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send('Not Found');
        }
    } else {
        next()
    }
}

module.exports = { getAllCountries, getCountryById, getCountryByName }