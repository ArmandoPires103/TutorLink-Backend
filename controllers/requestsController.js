// requestsController.js
const express = require("express");
const requestsRouter = express.Router();
const {
  getRequestsById,
  createRequestByStudent,
} = require("../queries/requests");

// renamed fx for clarity - we don't need a get all because this is particular to logged in tutor
requestsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await getRequestsById(id);
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

requestsRouter.post("/:tutorId", async (req, res) => {
  const { tutorId } = req.params;
  const { student_id: userId } = req.body;

  try {
    const createdRequest = await createRequestByStudent(tutorId, userId);
    res.status(201).json(createdRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = requestsRouter;
