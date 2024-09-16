import mongoose from 'mongoose';

const email = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(email)
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


export default connectDB;