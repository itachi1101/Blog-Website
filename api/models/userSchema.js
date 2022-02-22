const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum password length is 6 characters"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);




// methods are  accessible on the instances
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.pre("save", async function (next) {
  const user=this
  const salt = await bcrypt.genSalt();
  if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
  }
  next();
});

// statics methods are available on models
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const check = await bcrypt.compare(password, user.password);
    if (check) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Errow("incorrect email");
};
module.exports = mongoose.model("User", userSchema);
