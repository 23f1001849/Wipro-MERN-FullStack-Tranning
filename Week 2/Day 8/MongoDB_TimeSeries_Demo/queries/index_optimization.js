// Create a simple index on the time field to accelerate range scans
db.energy_readings.createIndex({ timestamp: 1 });

// Compound index to speed up meter-specific time-range queries
db.energy_readings.createIndex({ meterId: 1, timestamp: 1 });

// Example: verify the query plan uses the compound index
// db.energy_readings
//   .find({ meterId: "MTR001", timestamp: { $gte: ISODate("2025-10-29T10:00:00Z") } })
//   .sort({ timestamp: 1 })
//   .explain("executionStats");
