const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 3000;

const users = require("./src/routes/users");

const corsOptions = {
  origin: "*", // Remplacez par l'origine de votre frontend
  allowedHeaders: "Content-Type,Authorization",
};

app.use(morgan("[:date[iso]] :method :url :status - :response-time ms"));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/users", users);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
