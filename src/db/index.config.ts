import mongoose from "mongoose";

const URI = process.env.URI || "mongodb://localhost/evently";

async function connectToDB() {
  await mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export default connectToDB;
