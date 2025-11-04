// Retrieve all readings for a specific smart meter
// Usage: load('basic_queries.js') in the Mongo shell or run each snippet manually.
db.energy_readings.find({ meterId: "MTR001" }).sort({ timestamp: 1 });

// Find readings for a meter within a time window (inclusive bounds)
db.energy_readings
  .find({
    meterId: "MTR001",
    timestamp: {
      $gte: ISODate("2025-10-29T10:00:00Z"),
      $lte: ISODate("2025-10-29T12:00:00Z")
    }
  })
  .sort({ timestamp: 1 });

// Retrieve the most recent reading captured for every meter
// Relies on the natural bucketing of the time-series collection but enforces ordering by timestamp
db.energy_readings.aggregate([
  { $sort: { meterId: 1, timestamp: -1 } },
  {
    $group: {
      _id: "$meterId",
      location: { $first: "$location" },
      timestamp: { $first: "$timestamp" },
      energy_kWh: { $first: "$energy_kWh" },
      temperature_C: { $first: "$temperature_C" }
    }
  },
  { $sort: { _id: 1 } }
]);
