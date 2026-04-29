const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@cluster0.7bp1ezz.mongodb.net/mydb?retryWrites=true&w=majority`;

mongoose.connect(DB).then((con) => console.log("db connection succeefully"));

const port = 8000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running 🚀",
  });
});

app.listen(port, () => {
  console.log(`app is running on port${port}...`);
});

const server = process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");

  server.close(() => process.exit(1));
});
