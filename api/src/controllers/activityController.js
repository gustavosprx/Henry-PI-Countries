
const { postActivity } = require('../services/postActivity')
const { deleteActivityByName } = require('../services/deleteActivity')

const createActivity = async (req,res) => {
        
        try{
            const activityCreated = await postActivity(req.body)
        
            res.status(200).send(activityCreated)
        }catch(err){
            console.log(err)
            res.status(400).send('Error in Service')
        }
    
}

const deleteActivity = async (req,res) => {

    try{
        const activityDeleted = await deleteActivityByName(req.params)
    
        res.sendStatus(200).send(activityDeleted)
    }catch(err){
        console.log(err)
        res.sendStatus(400).send('Error in Service')
    }

}

module.exports = {createActivity,deleteActivity}