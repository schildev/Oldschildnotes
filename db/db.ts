import mongoose from "mongoose"

async function dbConnect() {
  return mongoose.connect(process.env.DB as string, {bufferCommands:false});
}

export default dbConnect