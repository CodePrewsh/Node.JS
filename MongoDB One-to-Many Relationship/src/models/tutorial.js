// Importing mongoose module
const mongoose = require("mongoose");

// Defining the Tutorial model
const Tutorial = mongoose.model(
  "Tutorial", // Model name
  new mongoose.Schema({
    // Title of the tutorial
    title: String,
    // Author of the tutorial
    author: String,
    // Images associated with the tutorial
    images: [],
    // Comments on the tutorial
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" // Reference to the Comment model
      }
    ],
    // Category to which the tutorial belongs
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category" // Reference to the Category model
    }
  })
);

// Exporting the Tutorial model
module.exports = Tutorial;
