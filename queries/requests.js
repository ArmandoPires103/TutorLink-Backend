// // queries/requests.js
const db = require("../db/dbConfig");

// const getRequestsById = async (tutorId) => {
//   console.log("query", tutorId);
//   try {
//     const tutorRequests = await db.any(
//       "SELECT student.username AS student_name, student.id AS student_id, student.email AS student_email, student.profile_pic AS student_profile_pic, requests.accepted FROM requests INNER JOIN users AS tutor ON requests.tutor_id = tutor.id INNER JOIN users AS student ON requests.user_id = student.id WHERE tutor.id = $1",
//       [tutorId]
//     );
//     console.log(tutorRequests);
//     return tutorRequests;
//   } catch (error) {
//     console.error("Error fetching requests:", error);
//     throw error;
//   }
// };

// module.exports = { getRequestsById };
// queries/requests.js
// const db = require("../db/dbConfig");

const getRequestsById = async (tutorId) => {
  console.log("query", tutorId);
  try {
    const tutorRequests = await db.any(
      "SELECT requests.id AS request_id, student.username AS student_name, student.id AS student_id, student.email AS student_email, student.profile_pic AS student_profile_pic, requests.accepted FROM requests INNER JOIN users AS tutor ON requests.tutor_id = tutor.id INNER JOIN users AS student ON requests.user_id = student.id WHERE tutor.id = $1",
      [tutorId]
    );
    console.log(tutorRequests);
    return tutorRequests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

const createRequestByStudent = async (tutorId, userId) => {
  try {
    const newRequest = await db.one(
      "INSERT INTO requests (user_id, tutor_id, accepted) VALUES ($1, $2, false) RETURNING *",
      [userId, tutorId]
    );
    return newRequest;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

const updateRequestById = async (tutorId, requestId) => {
  try {
    const updatedRequest = await db.one(
      "UPDATE requests SET accepted = false WHERE id = $1 AND tutor_id = $2 RETURNING *",
      [requestId, tutorId]
    );
    console.log("Updated Request:", updatedRequest);
    return updatedRequest;
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};

const deleteRequestById = async (tutorId, requestId) => {
  try {
    const deletedRequest = await db.one(
      "DELETE FROM requests WHERE id = $1 AND tutor_id = $2 RETURNING *",
      [requestId, tutorId]
    );
    console.log("Deleted Request:", deletedRequest);
    return deletedRequest;
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
};


module.exports = { getRequestsById, createRequestByStudent, updateRequestById, deleteRequestById };
