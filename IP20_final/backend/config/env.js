
module.exports = {
  // server
  port: process.env.PORT || 8080,
  host: process.env.HOST || "localhost",
  
  // mogno
  mongoURI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
  dbName: process.env.DB_NAME || "NCT127",
  
 //nasa
 nasaAPIKey: process.env.API_KEY || "qceukVgkhCZ4Q5zTHerTLI6SB6SKRgQtzEqk1wzN"
};