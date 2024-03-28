const express = require("express");
const user = express.Router();
const {
  findAllStudents,
  findUserByUsername,
  findStudentById,
  findAllTutors,
  findTutorById,
  updateUser,
  deleteUser,
} = require("../queries/users");
const { authenticateToken } = require("../middlewares/authenticateToken");
const {
  showStudentReviewBasedOnTutor,
  createStudentReview,
  updateStudentReview,
  deleteStudentReview,
  reviewBasedOnId,
} = require("../queries/studentreviews");

// --- Users: Tutors ---
// show all tutors
user.get("/tutors", async (req, res) => {
  const tutors = await findAllTutors();
  if (tutors[0]) res.json({ tutors });
});

// show one tutor
user.get("/tutors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await findTutorById(id);

    if (tutor) {
      res.status(200).json({ tutor });
    } else {
      res.status(404).json({ message: "Tutor not found" });
    }
  } catch (error) {
    console.error("Error finding tutor by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Users: Students ---
// Show all students
// not sure if needed!! because we don't need to display all the students, just all the tutors?
user.get("/students", async (req, res) => {
  const student = await findAllStudents();
  if (student[0]) res.json({ student });
});

// Show One Student for student profile
user.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await findStudentById(id);

    if (student) {
      res.status(200).json({ student });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error finding student by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Tutor REVIEW made by students Routes (one student can make many reviews for each tutor)

// show all reviews for one tutor
user.get("/tutors/:tutor_id/reviews", async (req, res) => {
  try {
    const { tutor_id } = req.params;
    const tutorReviews = await showStudentReviewBasedOnTutor(tutor_id);
    res.json({ tutorReviews: tutorReviews });
  } catch (error) {
    return `route error: ${error}`;
  }
});

user.get("/tutors/:tutor_id/reviews/:id", async (req, res) => {
  try {
    const { tutor_id, id } = req.params;
    const review = await reviewBasedOnId(tutor_id, id);
    if (review) {
      res.status(200).json({ review });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create review as a student for selected tutor
user.post("/tutors/:tutor_id/reviews", authenticateToken, async (req, res) => {
  const { tutor_id } = req.params;
  try {
    const tutorReview = await createStudentReview(...[req.body], tutor_id);
    res.json({ tutorReview: tutorReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// edit review as a student for selected tutor
user.put("/tutors/:tutor_id/reviews/:id", async (req, res) => {
  const { tutor_id, id } = req.params;
  try {
    const updatedTutorReview = await updateStudentReview(
      id,
      ...[req.body],
      tutor_id
    );
    res.json({ tutorReview: updatedTutorReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete review as a student for selected tutor
user.delete("/tutors/:tutor_id/reviews/:id", async (req, res) => {
  const { tutor_id, id } = req.params;
  try {
    await deleteStudentReview(id, tutor_id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Login stuff ---

// needed for login
user.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);
    if (user) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user by username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// to login
user.post("/", authenticateToken, async (req, res) => {
  try {
    const { username, password, email, is_tutor } = req.body;

    const newUser = await createUser({ username, password, email, is_tutor });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update
user.put("/:username", authenticateToken, async (req, res) => {
  try {
    const { username } = req.params;
    const { password_hash, email, is_tutor } = req.body;

    const updatedUser = await updateUser({
      username,
      password_hash,
      email,
      is_tutor,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

user.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // changed to id

    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = user;
