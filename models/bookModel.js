const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    ratersNumber: {
      type: Number,
      validate: {
        validator: function (value) {
          return value == Object.keys(this.raters).length;
        },
      },
    },
    raters: [{ type: String }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const book = mongoose.model("book", bookSchema, "book");
module.exports = book;
