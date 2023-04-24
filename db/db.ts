import mongoose from "mongoose"

async function dbConnect() {
  return mongoose.connect("mongodb+srv://schildNotes:ejfaojfoKODKOAZKDZapdjpaok@miliosa.r6ftxgq.mongodb.net/Schildnotes?retryWrites=true&w=majority");
}

export default dbConnect
