const mongoose = require("mongoose");

// ---------------------------------------- create connection

mongoose
  .connect("mongodb+srv://fainilsojitra100:fainilsojitra100@cluster0.lckol.mongodb.net/shop")
  // .connect("mongodb://localhost:27017/shop")
  // .connect("mongodb://127.0.0.1:27017/shop")
  // mongoose.connect('mongodb://localhost:27017/shop', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .then(() => console.log("Connection Successfull..."))
  .catch((err) => console.log(err, "-- 0 No connection 0 --"));
