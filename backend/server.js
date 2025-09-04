const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend

// Reviews file
const reviewsFile = path.join(__dirname, "reviews.json");

// Helper: Read reviews
function readReviews() {
  if (!fs.existsSync(reviewsFile)) return [];
  const data = fs.readFileSync(reviewsFile);
  return JSON.parse(data || "[]");
}

// Helper: Write reviews
function writeReviews(reviews) {
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
}

// Get all reviews
app.get("/api/reviews", (req, res) => {
  const reviews = readReviews();
  res.json(reviews);
});

// Add new review
app.post("/api/reviews", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Review text required" });

  const reviews = readReviews();
  const newReview = { id: Date.now(), text };
  reviews.push(newReview);
  writeReviews(reviews);

  res.json(newReview);
});

// Render will serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
