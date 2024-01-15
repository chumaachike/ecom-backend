import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const verifyJWT = (req, res, next) => {
    try {
        // Extracting the token from the request headers
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({ message: 'A token is required for authentication' });
        }

        // Verifying the token
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized!' });
            }

            // If the token is valid, save the decoded data to the request
            req.user = decoded;
            
            // Proceed to the next middleware/function
            next();
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
