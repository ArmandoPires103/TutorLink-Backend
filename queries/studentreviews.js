const db = require('../db/dbConfig');

const showStudentReviews = async () => {
    try {
        const reviews = await db.any("SELECT * FROM student_reviews");
        return reviews;
    } catch (error){
        return error;
    }
};
const showStudentReview = async (id) => {
    try {
        const oneReview = await db.one("SELECT * FROM student_reviews WHERE id=$1", id);
        return oneReview;
    } catch (error){
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

const createStudentReview = async (assigned_tutor_id, subject, description, user_id, ratings) => {
    try {
        const { assigned_tutor_id, subject, description, user_id, ratings } = reviewData;
        const query = `
            "INSERT INTO student_reviews (assigned_tutor_id, subject, description, user_id, ratings) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const newReview = await db.one(query,[assigned_tutor_id, subject, description, user_id, ratings]
        );
        return newReview;
    } catch (error) {
        console.error("Error creating user:", error);throw error; 
    }
};


module.exports = { 
    showStudentReviews,
    showStudentReview,
    createStudentReview
};
