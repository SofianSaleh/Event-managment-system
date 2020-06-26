import mongoose from "mongoose";

const URI = process.env.URI || "mongodb://localhost/evently";

function connectToDB() {
  mongoose.connect(`mongodb://localhost/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
