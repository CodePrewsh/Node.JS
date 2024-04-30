// Importing required modules
const mongoose = require("mongoose");

// Importing models
const db = require("./models");

// Function to create a new tutorial
const createTutorial = function(tutorial) {
  return db.Tutorial.create(tutorial).then(docTutorial => {
    console.log("\n>> Created Tutorial:\n", docTutorial);
    return docTutorial;
  });
};

// Function to create a new image for a tutorial
const createImage = function(tutorialId, image) {
  return db.Image.create(image).then(docImage => {
    console.log("\n>> Created Image:\n", docImage);
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: docImage._id,
            url: docImage.url,
            caption: docImage.caption
          }
        }
      },
      { new: true, useFindAndModify: false }
    );
  });
};

// Function to create a new comment for a tutorial
const createComment = function(tutorialId, comment) {
  return db.Comment.create(comment).then(docComment => {
    console.log("\n>> Created Comment:\n", docComment);

    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { $push: { comments: docComment._id } },
      { new: true, useFindAndModify: false }
    );
  });
};

// Function to create a new category
const createCategory = function(category) {
  return db.Category.create(category).then(docCategory => {
    console.log("\n>> Created Category:\n", docCategory);
    return docCategory;
  });
};

// Function to add a tutorial to a category
const addTutorialToCategory = function(tutorialId, categoryId) {
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    { category: categoryId },
    { new: true, useFindAndModify: false }
  );
};

// Function to retrieve a tutorial with populated comments and category
const getTutorialWithPopulate = function(id) {
  return db.Tutorial.findById(id)
    .populate("comments", "-_id -__v")
    .populate("category", "name -_id")
    .select("-images._id -__v");
};

// Function to retrieve all tutorials in a category
const getTutorialsInCategory = function(categoryId) {
  return db.Tutorial.find({ category: categoryId })
    .populate("category", "name -_id")
    .select("-comments -images -__v");
};

// Main function to run the script
const run = async function() {
  // Step 1: Create a new tutorial
  var tutorial = await createTutorial({
    title: "MongoDB One-to-Many Relationship example",
    author: "bezkoder.com"
  });

  // Step 2: Add images to the tutorial
  tutorial = await createImage(tutorial._id, {
    path: "sites/uploads/images/mongodb.png",
    url: "https://bezkoder.com/images/mongodb.png",
    caption: "MongoDB Database",
    createdAt: Date.now()
  });
  console.log("\n>> Tutorial:\n", tutorial);

  tutorial = await createImage(tutorial._id, {
    path: "sites/uploads/images/one-to-many.png",
    url: "https://bezkoder.com/images/one-to-many.png",
    caption: "One to Many Relationship",
    createdAt: Date.now()
  });
  console.log("\n>> Tutorial:\n", tutorial);

  // Step 3: Add comments to the tutorial
  tutorial = await createComment(tutorial._id, {
    username: "Precious",
    text: "This is a great tutorial.",
    createdAt: Date.now()
  });
  console.log("\n>> Tutorial:\n", tutorial);

  tutorial = await createComment(tutorial._id, {
    username: "Precious",
    text: "Thank you, it helps me alot.",
    createdAt: Date.now()
  });
  console.log("\n>> Tutorial:\n", tutorial);

  // Step 4: Create a new category
  var category = await createCategory({
    name: "Node.js",
    description: "Node.js tutorial"
  });

  // Step 5: Add the tutorial to the category
  tutorial = await addTutorialToCategory(tutorial._id, category._id);
  console.log("\n>> Tutorial:\n", tutorial);

  // Step 6: Populate tutorial with comments and category
  tutorial = await getTutorialWithPopulate(tutorial._id);
  console.log("\n>> populated Tutorial:\n", tutorial);

  // Step 7: Create a new tutorial and add it to the same category
  var newTutorial = await createTutorial({
    title: "Mongoose tutorial with examples",
    author: "bezkoder.com"
  });

  await addTutorialToCategory(newTutorial._id, category._id);

  // Step 8: Retrieve all tutorials in the category
  var tutorials = await getTutorialsInCategory(category._id);
  console.log("\n>> all Tutorials in Cagetory:\n", tutorials);
};

// Step 9: Connect to MongoDB
mongoose
  .connect("mongodb://localhost/bezkoder_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

// Step 10: Run the main function
run();
