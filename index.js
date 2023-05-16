const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

// Base de datos
dbConnection();

// CORS
// app.unsubscribe(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(process.env.PORT, () => {
  console.log(`Server started in port ${process.env.PORT}`);
});
