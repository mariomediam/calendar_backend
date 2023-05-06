const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,      
    });
    console.log("DB Online");
  } catch (error) {
    console.log("******************************************")
    console.log(error);
    console.log("******************************************")
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
