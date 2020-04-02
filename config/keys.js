// const mongoPass = require("./passwords").mongoPass;

module.exports = {
  // mongoURI: "mongodb+srv://pct:" + mongoPass + "@cluster0-9gtht.mongodb.net/test?retryWrites=true&w=majority",
  mongoURI: process.env.mongoURI || "mongodb://localhost:27017",
  // mongoURI: "mongodb://localhost:27017", //for local
  secretOrKey: "secret"
};
