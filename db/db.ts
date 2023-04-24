import mongoose from "mongoose"
const pass = ""
const connectionSTR = "mongodb+srv://schildNotes:ejfaojfoKODKOAZKDZapdjpaok@miliosa.r6ftxgq.mongodb.net/Schildnotes?retryWrites=true&w=majority"

async function dbConnect() {
  return mongoose.connect(connectionSTR, {bufferCommands:false});
}

export default dbConnect