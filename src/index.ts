import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import t from "./translate/translate";

const app = express();
const port = 3008;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

app.use(cors());
dotenv.config();

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "api",
  });
});

///////////////ROUTESS///////////

app.use(t);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
