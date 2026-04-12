import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Read MONGODB_URI from environment INSIDE the function (after dotenv has loaded)
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yawk_digital';
    
    // Debug: Check if env variable is loaded
    console.log('MONGODB_URI from env:', process.env.MONGODB_URI ? 'EXISTS' : 'MISSING');
    if (process.env.MONGODB_URI) {
      const uriForDebug = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
      console.log('MONGODB_URI value:', uriForDebug);
    }
    
    // Log which database we're connecting to (hide password)
    const uriForLog = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
    console.log('Connecting to MongoDB:', uriForLog);
    
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    console.log('Database name:', mongoose.connection.db.databaseName);
    console.log('Connection host:', mongoose.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
