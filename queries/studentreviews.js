const db = require("../db/dbConfig");

const showStudentReviewBasedOnTutor = async (tutor_id) => {
  try {
    const tutorReviews = await db.any(
      "SELECT * FROM student_reviews WHERE tutor_id = $1",
      tutor_id
    );
    return tutorReviews;
  } catch (error) {
    return error;
  }
};

//data looks like this:
/*
INSERT INTO student_reviews (assigned_tutor_id, subject, description, user_id, ratings) 
VALUES (1, 'Mathematics', 'Great tutor, very helpful with calculus problems.', 4, 5),
(2, 'Physics', 'Great tutor, very helpful with inertia problems.', 5, 5),
(3, 'Chemistry', 'Great tutor, very helpful with stoichiometry problems.', 6, 5)
;
*/

const createStudentReview = async (review) => {
  try {
    const query = `
      INSERT INTO student_reviews (tutor_id, subject, description, user_id, ratings)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const newReview = await db.one(query, [
      review.tutor_id,
      review.subject,
      review.description,
      review.user_id,
      review.ratings,
    ]);
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

const updateStudentReview = async (reviewId, updatedReview) => {
  try {
    const query = `
      UPDATE student_reviews
      SET tutor_id = $1, subject = $2, description = $3, user_id = $4, ratings = $5
      WHERE id = $6
      RETURNING *`;
    const updatedReviewData = await db.one(query, [
      updatedReview.tutor_id,
      updatedReview.subject,
      updatedReview.description,
      updatedReview.user_id,
      updatedReview.ratings,
      reviewId,
    ]);
    return updatedReviewData;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

const deleteStudentReview = async (reviewId) => {
  try {
    const query = `
      DELETE FROM student_reviews
      WHERE id = $1
      RETURNING *`;
    const deletedReviewData = await db.one(query, [reviewId]);
    return deletedReviewData;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};


module.exports = {
  createStudentReview,
  showStudentReviewBasedOnTutor,
  updateStudentReview,
  deleteStudentReview
};
