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
const { showStudentReviewBasedOnTutor } = require("../queries/studentreviews");

// in front end map through not sure what the key is but tutors (so students can see all the tutotrs)
// removed authenticate token
// post for logging in is in auth
user.get("/tutors", async (req, res) => {
  const tutors = await findAllTutors();
  if (tutors[0]) res.json({ tutors });
});

user.get("/tutors/:tutor_id/reviews", async (req, res) => {
  try {
    const { tutor_id } = req.params;
    const tutorReviews = await showStudentReviewBasedOnTutor(tutor_id);
    res.json({ tutorReviews: tutorReviews });
  } catch (error) {
    return `route error: ${error}`;
  }
});

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

// not needed!! because we don't need to display all the students, just all the tutors
user.get("/students", async (req, res) => {
  const student = await findAllStudents();
  if (student[0]) res.json({ student });
});

// for student profile
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

// create
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
