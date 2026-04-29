const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please write your username"],
      unique: [true, "this username already exists"],
    },
    email: {
      type: String,
      // required: [true, "Please write your email"],
      unique: [true, "this email already exists"],
      sparse: true, // This allows MongoDB to ignore null values when enforcing uniqueness
      lowercase: true,
      validate: [validator.isEmail, "Please write avalid email"],
    },

    password: {
      type: String,
      required: [true, "Please write your password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please write your password"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password isn't the same!",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user", "supervisor"],
      default: "user",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true, // ✅ CORRECT
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre("save", async function () {
  if (!this.isModified("password") || this.isNew) {
    return;
  }

  this.passwordChangeAt = Date.now() - 1000;
});

userSchema.methods.correctPassword = async function (
  passwordCandidate,
  userPassword
) {
  passwordCandidate = passwordCandidate.toString();
  return await bcrypt.compare(passwordCandidate, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimesstamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimesstamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
