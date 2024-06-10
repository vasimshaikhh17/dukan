import mongoose from "mongoose";

//schema
const categorySchema = new mongoose.Schema(
  {
    // category: {
    //   type: String,
    //   required: [true, "category title is required"],
    // },
    title: {
      type: String,
      required: [true, "Category Title is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

//export
export const Category = mongoose.model("Category", categorySchema);

// Static data (for initial population)
const initialCategories = [
  {
    category: "Top",
    title: "Jeans",
    imageUrl: "http://example.com/electronics.jpg",
  },
  {
    category: "Bottom",
    title: "Books",
    imageUrl: "http://example.com/books.jpg",
  },
  {
    category: "Watches",
    title: "FastTracks",
    imageUrl: "http://example.com/clothing.jpg",
  },
];

// Function to initialize database with static data
export const initializeCategories = async () => {
  try {
      const count = await Category.countDocuments();
      if (count === 0) {
          await Category.insertMany(initialCategories);
          console.log('Initial categories have been populated');
      }
  } catch (error) {
      console.error('Error initializing categories:', error);
  }
};
