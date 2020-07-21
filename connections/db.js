const mongo = require("mongoose");

mongo.connect(
  "mongodb+srv://youtubeuser:test123@cluster-utfcg.mongodb.net/chat-app?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error connecting to MongoDB");
      console.error(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

module.exports = mongo.connection;
