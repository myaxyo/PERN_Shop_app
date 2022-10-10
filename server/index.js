require("dotenv").config();
const express = require("express");
const path = require("path");
const sequelize = require("./db");
const app = express();
const models = require("./models/Models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const PORT = process.env.PORT || 5000;
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//check the error
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
