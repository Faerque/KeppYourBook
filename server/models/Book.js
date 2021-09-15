const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    category: {
      type: "string",
      required: [true, " Book Category is Required"],
    },
    author: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
