import mongoose from 'mongoose';

const connectDatabase = (mongoURI) => {
  mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
}

export default connectDatabase;
