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
            const token = jwt.sign({ userId: userData._id }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).send(err);
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
            const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}


export default new AuthController();