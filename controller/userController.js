import userModel from '../models/User.js';

class UserController{
    async getAllUsers(req, res){
        try {
            const allUsers = await userModel.find({});
            res.send(allUsers);
          } catch (err) {
            res.status(400).send(err.message);
          }
    }
}


export default new UserController();