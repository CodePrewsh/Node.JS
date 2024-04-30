// Require Mongoose and BlogPost model
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

// Define the data for the new blog post
const newBlogPost = {
  title: "The Mythbuster Guide to Saving Money on Energy Bills",
  body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everywhere at this time of year. They go like this:",
};

// Create the new blog post
// BlogPost.create(newBlogPost)
//   .then((blogpost) => {
//     // If successful, log the created blog post
//     console.log("Blog post created:", blogpost);
//   })
//   .catch((error) => {
//     // If there's an error, log the error
//     console.error("Error creating blog post:", error);
//   });

// to find all documents in BlogPosts collection with ‘The’ in the title
// async function findBlogPosts() {
//   try {
//       const blogposts = await BlogPost.find({ title: /The/ }).exec();
//       console.log("Blog posts with 'The' in the title:", blogposts);
//   } catch (error) {
//       console.error("Error finding blog posts:", error);
//   }
// }
// findBlogPosts();

// To get single database documents, i.e.
// to retrieve single documents with unique id

// async function findBlogPostById() {
//   try {
//       const id = "6628d68e761a06c98fd9c298"; // ID object
//       const blogpost = await BlogPost.findById(id).exec();
//       console.log("Blog post found:", blogpost);
//   } catch (error) {
//       console.error("Error finding blog post:", error);
//   }
// }
// findBlogPostById();

// Updating Records
// To update a record, we use findByIdAndUpdate

var id = "662dc37800afba7065d284e5";
BlogPost.findByIdAndUpdate(id, { title: "Updated title" }, { new: true })
  .exec()
  .then((blogpost) => {
    console.log("Updated blog post:", blogpost);
  })
  .catch((error) => {
    console.error("Error updating blog post:", error);
  });

// Deleting Single Record
// To delete a record, we use the findByIdAndDelete where
// we provide id as the first argument

//  

// let id = "6626e19e8479fde5428d687f";
// BlogPost.findByIdAndDelete(id).then(blogpost => {
//     console.log("Successfully found and deleted\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find and delete\n" + error);
// });
