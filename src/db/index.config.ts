import mongoose from "mongoose";

const URI = process.env.URI || "mongodb://localhost/evently";

export default async function connectToDB() {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));

    db.once("open", function () {
      console.log("Connection Successful!");
    });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}
