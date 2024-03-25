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

// we can use this so students can see te reviews they created
studentReviews.get('/:id', async (req, res) => {
    const {id} = req.params;
    const review = await showStudentReview(id);
    if (review){
        res.json(review);
    } else {
        res.status(404).json({error: "not found"})
    }
});

// Route to create a new student review
studentReviews.post('/', async (req, res) => {
    try {
        const { studentId, tutorId, rating, comment } = req.body;
        const newReview = await createStudentReview(studentId, tutorId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: "Failed to create review" });
    }
});
module.exports = studentReviews;