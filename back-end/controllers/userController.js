const User = require('../models/User')
const ObjectID = require('mongodb').ObjectID
const userController = {
    getAllUser: async (req, res) => {
        try {
            await User.find({})
                .then(users => {
                    if (users) {
                        return res.status(200).json({ users: users })
                    }
                })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            console.log(req.params.id)
            const user = await User.findById({ _id: ObjectID(req.params.id) })
            if (user) {
                return res.status(200).json('DELETE SUCCESSFULLY')
            } else {
                return res.status(404).json('USER DOESNT EXIST')
            }
        } catch (error) {
            res.status(500).json('USER DOESNT EXIST');
        }

    }
}

module.exports = userController