// requestsController.js
const express = require('express');
const requestsRouter = express.Router();
const { getRequestsById } = require("../queries/requests");

// renamed fx for clarity - we don't need a get all because this is particular to logged in tutor
requestsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await getRequestsById(id);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = requestsRouter;
