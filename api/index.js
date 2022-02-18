const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { checkUser } = require("./middlewares/authMiddleware");
const app = express();
dotenv.config();
const PORT = 5000;
app.use(express.json());
mongoose.connect(
  "mongodb+srv://aviral:aviral@cluster0.a8ukl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// app.use("/signup", checkUser);
app.use(authRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Listening on Port ${PORT}`);
});
