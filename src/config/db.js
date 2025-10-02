const mongoose = require('mongoose');

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      dbName : "comp3123_assignment1",
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch(err){
    console.error(err.message);
    process.exit(1);
  }
}

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = connectDB;