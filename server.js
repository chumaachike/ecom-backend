const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const userModel = require('./models/User'); 

const app = express();
app.use(express.json());
const port = 3001; 

// Define the MongoDB connection URL
const mongoURI = 'mongodb://127.0.0.1/ecomn';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected!'));

app.get('', async(req, res)=>{
  try{
    const allUsers = await userModel.find({})
    res.send(allUsers)
  }catch(err){
    res.status(400).send(err.message);
  }
})

app.post('/signup', async (req, res) => {
  const {username, email, password} = req.body
  try {
    const userData = new userModel({ user_id: uuidv4(), username, email, password });

    await userData.save();
    const token = jwt.sign({ userId: userData._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post('/login', async(req, res)=>{
  try{
    const {username, password} = req.body;

    const user = await userModel.findOne({ username});
    if (!user){
      return res.status(400).send("User not found")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }
    // Create a token
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    // Send the token to the client
    res.json({ token });
  }catch (error){
    res.status(500).send(error.message)
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
