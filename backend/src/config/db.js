const mongoose = require('mongoose');

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

module.exports = async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGO_URI; 
    if (!uri) throw new Error('Missing MONGO_URI env var');

    cached.promise = mongoose.connect(uri, {
      dbName: 'comp3123_assignment1',
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    }).then(m => {
      console.log('MongoDB connected');
      return m;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
