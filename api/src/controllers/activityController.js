
const { postActivity } = require('../services/postActivity')
const { deleteActivityByName } = require('../services/deleteActivity')

const createActivity = async (req, res) => {

    try {
        const activityCreated = await postActivity(req.body)

        res.status(200).send(activityCreated)

    } catch (err) {

        res.status(500).send(`Bad request: ${err.message}`);
    }
}

const deleteActivity = async (req, res) => {
    try {
        await deleteActivityByName(req.params);

        res.status(200).send('Activity deleted');
    } catch (err) {

        res.status(500).send(`Bad request: ${err.message}`);
    }
}


module.exports = { createActivity, deleteActivity }