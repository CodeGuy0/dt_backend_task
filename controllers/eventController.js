const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const db = await connectDB();

    const data = req.body;

    // required fixed values
    data.type = "event";

    // convert numeric values
    data.uid = Number(data.uid);
    data.rigor_rank = Number(data.rigor_rank);
    data.schedule = Number(data.schedule);

    // attendees must be array of numbers
    if (data.attendees) {
      data.attendees = JSON.parse(data.attendees); // coming as string from form-data
    } else {
      data.attendees = [];
    }

    // Handle file upload
    if (req.file) {
      data.files = "/uploads/" + req.file.filename;
    }

    const result = await db.collection("events").insertOne(data);

    return res.status(201).json({
      message: "Event created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET EVENT BY ID
exports.getEventById = async (req, res) => {
  try {
    const db = await connectDB();

    const id = req.query.id;

    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    return res.json(event);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET LATEST EVENTS
exports.getLatestEvents = async (req, res) => {
  try {
    const db = await connectDB();

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const events = await db
      .collection("events")
      .find({})
      .sort({ schedule: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;

    const update = req.body;

    if (req.file) {
      update.files = "/uploads/" + req.file.filename;
    }

    await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    return res.json({ message: "Event updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;

    await db.collection("events").deleteOne({ _id: new ObjectId(id) });

    return res.json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
