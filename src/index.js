const express = require("express");
let PORT =process.env.PORT || 8080;
const jobRouter = require("./Controller/jobs.router");


const dbConnect = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Job Page");
});

app.use("/job", jobRouter);

app.listen(PORT||8080, async () => {
  await dbConnect();
  console.log(`Listening on http://localhost:${PORT}`);
});
