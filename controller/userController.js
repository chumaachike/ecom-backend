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
    async editUser(req, res){
      try {
          // Assuming the user's ID and new data are sent in the request
          const userId = req.params.id;
          const newUserData = req.body;
  
          // Find the user by ID and update their data
          const updatedUser = await userModel.findByIdAndUpdate(userId, newUserData, { new: true });
  
          // If no user found, send a 404 response
          if (!updatedUser) {
              return res.status(404).send("User not found");
          }
  
          // Send back the updated user data
          res.send(updatedUser);
      } catch (err) {
          res.status(400).send(err.message);
      }
  }
  
}


export default new UserController();