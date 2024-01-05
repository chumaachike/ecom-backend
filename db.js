const mongoose = require('mongoose');

// Connect to the local MongoDB instance (default port is 27017)
mongoose.connect('mongodb://localhost:27017/ecomn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to local MongoDB');
});

module.exports = db;
