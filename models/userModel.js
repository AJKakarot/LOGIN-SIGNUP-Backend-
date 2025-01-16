const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
            firstName: {
              type: String,
              required: [true, "name is required"],
            },
            lastName: {
                type: String,
                required: [true, "name is required"],
              },
            email: {
              type: String,
              required: [true, "email is required and should be unique"],
              unique: true,
            },
            password: {
              type: String,
              required: [true, "password is required"],
            },
          },
          { timestamps: true }
        );
        

        const userModel = mongoose.model("Users", userSchema);
        module.exports = userModel;

