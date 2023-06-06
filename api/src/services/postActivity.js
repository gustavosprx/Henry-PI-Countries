const { Activity, Country } = require('../db')

const postActivity = async function (activity) {

    console.log(activity)
    try {
        const newActivity = await Activity.create({
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season
        })

        console.log(newActivity)

        Promise.all(activity.countries.map(async element => {
            console.log(element)
            let activityCountrie = await Country.findOne({
                where: {
                    id: element
                }
            })
            await newActivity.addCountry(activityCountrie)
        }))

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postActivity
}