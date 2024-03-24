// requestsController.js
const express = require('express');
const requestsRouter = express.Router();
const { getAllRequests } = require("../queries/requests");

// Define route handler for /api/requests
requestsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const requests = await getAllRequests(id);
  res.json(requests);
});

module.exports = requestsRouter;
