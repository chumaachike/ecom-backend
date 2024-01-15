import mongoose from 'mongoose';

const connectDatabase = async(mongoURI) => {
  try{
    await mongoose.connect(mongoURI)
  }catch(err){
    console.error('Could not connect to MongoDB', err)
  }
}

export const clearDatabase = async () => {
  // Check if the database connection is established
  if (!mongoose.connection.db) {
    throw new Error('No active MongoDB connection');
  }

  try {
    // Retrieve all collections
    const collections = await mongoose.connection.db.collections();

    // Iterate over each collection and clear it
    for (let collection of collections) {
      await collection.deleteMany({});
      console.log(`Cleared ${collection.collectionName}`);
    }

    console.log('All collections cleared.');
  } catch (err) {
    console.error('Error clearing collections:', err);
  }
};


export default connectDatabase;
