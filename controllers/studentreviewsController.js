const express = require('express');
const studentReviews = express.Router();
const { showStudentReviews, showStudentReview, createStudentReview } =require("../queries/studentreviews");

// Define route handler for /api/reviews
// added get all reviews (to showcase / promote how awesome our tutors are)
studentReviews.get('/', async (req, res) => {
    const review = await showStudentReviews();
    if (review[0]){
        res.json(review);
    } else {
        res.status(404).json({error: "not found"})
    }
});

module.exports = studentReviews;