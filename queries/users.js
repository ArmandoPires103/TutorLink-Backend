const db = require("../db/dbConfig");

/**
 * Finds a user by their username.
 * @param {string} username - The username of the user to find.
 * @returns {Promise<object|null>} The user object if found, otherwise null.
 */

const findAllTutors = async () => {
  try {
    const query =
      "SELECT id, profile_pic, name, subject, description, is_remote FROM users WHERE is_Tutor = TRUE;";
    const tutors = await db.any(query);
    return tutors;
  } catch (error) {
    console.error("Error finding tutors:", error);
    throw error;
  }
};

const findAllStudents = async () => {
  try {
    const query =
      "SELECT id, name, email, subject, is_enrolled FROM users WHERE is_Tutor = FALSE;";
    const tutors = await db.any(query);
    return tutors;
  } catch (error) {
    console.error("Error finding tutors:", error);
    throw error;
  }
};

// not sure if we need
const findTutorById = async (id) => {
  try {
    const query =
      "SELECT id, name, email, subject, description, is_enrolled, profile_pic FROM users WHERE is_tutor = TRUE AND id = $1";

    const user = await db.oneOrNone(query, id);

    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

const findStudentById = async (id) => {
  try {
    const query =
      "SELECT id, name, email, subject, is_enrolled FROM users WHERE is_tutor = FALSE AND id = $1";

    const user = await db.oneOrNone(query, id);

    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

const createUser = async ({ profile_pic, name, username, password_hash, email, is_tutor, is_remote, subject, is_enrolled, is_booked, description }) => {
  try {
    const query = `
      INSERT INTO users (profile_pic, name, username, password_hash, email, is_tutor, is_remote, subject, description, is_enrolled, is_booked)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, profile_pic, name, username, password_hash, email, is_tutor, is_remote, subject, description, is_enrolled, is_booked; 
    `;
    const newUser = await db.one(query, [
      profile_pic, name, username, password_hash, email, is_tutor, is_remote, subject, description,is_enrolled, is_booked
    ]);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error to be handled at a higher level
  }
};

// important!!!! Used for login!!! DO NOT CHANGE!
const findUserByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const user = await db.oneOrNone(query, username);
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};
// Edit
const updateUser = async ({ id, username, password_hash, email, is_tutor }) => {
  const query = `
    UPDATE users 
    SET username = $1, password_hash = $2, email = $3, is_tutor = $4
    WHERE id = $5
    RETURNING id, username, email, is_tutor; 
  `;
  const updatedUser = await db.one(query, [
    username,
    password_hash,
    email,
    is_tutor,
    id,
  ]);
  return updatedUser;
};

// Delete
const deleteUser = async (username) => {
  try {
    const query = "DELETE FROM users WHERE username = $1";
    const deletedUser = await db.oneOrNone(query, username);
    return deletedUser;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

module.exports = {
  findAllTutors,
  findUserByUsername,
  findTutorById,
  findAllStudents,
  findStudentById,
  createUser,
  deleteUser,
  updateUser,
};
