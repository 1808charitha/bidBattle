import mongoose from 'mongoose';

// A function to establish the database connection
export async function connectDatabase(): Promise<mongoose.Connection> {
  try {
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/BidBattle');
    console.log('Connected to MongoDB');
    return connection.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
} 
