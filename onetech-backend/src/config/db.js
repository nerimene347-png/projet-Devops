const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDB() {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log(
      `✅ MongoDB connecté : ${mongoose.connection.host}/${mongoose.connection.name}`,
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("❌ Échec de connexion à MongoDB :", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
