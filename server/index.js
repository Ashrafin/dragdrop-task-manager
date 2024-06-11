const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const boardsRouter = require("./routes/boards");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/api/boards", boardsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});