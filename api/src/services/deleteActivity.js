const { Activity } = require('../db')

const deleteActivityByName = async (params) => {
    const { name } = params
    console.log(name)
    try {
        const deleted = await Activity.destroy({
            where: {
              name: name
            }
          })
          console.log(deleted)
          return deleted
 
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {deleteActivityByName}