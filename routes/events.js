const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createEvent,
  getEventById,
  getLatestEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// create event with image
router.post("/events", upload.single("files"), createEvent);

// get events list
router.get("/events", getLatestEvents);

// get single event by ID
router.get("/events/details", getEventById);

// update event
router.put("/events/:id", upload.single("files"), updateEvent);

// delete event
router.delete("/events/:id", deleteEvent);

module.exports = router;
