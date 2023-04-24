import mongoose from "mongoose"

async function dbConnect() {
  return mongoose.connect(process.env.DB as string);
}

export default dbConnect
