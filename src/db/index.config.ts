import mongoose from "mongoose";

const URI = process.env.URI || "mongodb://localhost/evently";

// async function connectToDB() {
//   try {
//     await mongoose.connect(`${URI}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//   } catch (e) {
//     console.log(e.message);
//     throw e;
//   }
// }
// }
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
