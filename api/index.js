const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { checkUser, requireAuth } = require("./middlewares/authMiddleware");
const PORT = 5000;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use("/signup", checkUser);
app.use(authRoutes);
app.use(postRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Listening on Port ${PORT}`);
});
