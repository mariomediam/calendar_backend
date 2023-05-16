const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

// Base de datos
dbConnection();

// CORS
// app.unsubscribe(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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
