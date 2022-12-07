const mongoose = require("mongoose");

const PRODUCTSCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", PRODUCTSCHEMA);

module.exports = ProductModel;
