const db = require("../db/dbConfig");

/**
 * Finds a user by their username.
 * @param {string} username - The username of the user to find.
 * @returns {Promise<object|null>} The user object if found, otherwise null.
 */
// const findAllUsers = async (username) => {
//   try {
//     const query = 'SELECT * FROM users;'

//     const user = await db.any(query, username)

//     return user
//   } catch (error) {
//     console.error('Error finding user by username:', error)
//     throw error
//   }
// }

const findAllTutors = async () => {
  try {
    const query =
      "SELECT id, profile_pic, name, subject, is_remote FROM users WHERE is_Tutor = TRUE;";
    const tutors = await db.any(query);
    return tutors;
  } catch (error) {
    console.error("Error finding tutors:", error);
    throw error;
  }
};

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

// probably need to add is_tutor (to frontend as well)
// ---- original kept for reference ----
// const createUser = async ({ username, password_hash, email }) => {
//   const query = `
//       INSERT INTO users (username, password_hash, email)
//       VALUES ($1, $2, $3 )
//       RETURNING id, username, email;
//     `
//   const newUser = await db.one(query, [username, password_hash, email])
//   return newUser
// }

// create
const createUser = async ({ username, password_hash, email, is_tutor }) => {
  try {
    const query = `
      INSERT INTO users (username, password_hash, email, is_tutor)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, is_tutor; 
    `;
    const newUser = await db.one(query, [
      username,
      password_hash,
      email,
      is_tutor,
    ]);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error to be handled at a higher level
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
  createUser,
  deleteUser,
  updateUser,
};
