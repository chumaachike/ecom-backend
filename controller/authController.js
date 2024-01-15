import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/User.js';
import config from '../config/config.js';

class AuthController {
    async signup(req, res) {
        const { username, email, password } = req.body;
        try {
            const userData = new userModel({ username, email, password });

            await userData.save();
            const userResponse = {
                id: userData._id,
                username: userData.username,
                email: userData.email,
                
            };
            const token = jwt.sign({ userId: userResponse.id }, config.jwtSecret, { expiresIn: '24h' });
            req.session.jwt = token;
            res.status(200).json(userResponse);
        } catch (error) {
            if (error.code === 11000) { // Duplicate key error
                res.status(500).json({ error: 'Error: A user with the same username or email already exists.' });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(400).send("User not found");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid password');
            }
            const userResponse = {
                id: user._id,
                username: user.username,
                email: user.email,
                
            };
            const token = jwt.sign({ userId: userResponse.id }, config.jwtSecret, { expiresIn: '24h' });
            req.session.jwt = token;
            res.status(200).json( userResponse);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async logout(req, res) {
        try {
           const hhh = await req.session.destroy();
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
}


export default new AuthController();