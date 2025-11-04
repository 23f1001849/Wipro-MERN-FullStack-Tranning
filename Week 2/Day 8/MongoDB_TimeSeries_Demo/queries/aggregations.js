// Total energy consumption per meter for the loaded dataset
db.energy_readings.aggregate([
  {
    $group: {
      _id: "$meterId",
      totalEnergy_kWh: { $sum: "$energy_kWh" },
      readingCount: { $count: {} }
    }
  },
  { $sort: { totalEnergy_kWh: -1 } }
]);

// Average ambient temperature by location
db.energy_readings.aggregate([
  {
    $group: {
      _id: "$location",
      avgTemperature_C: { $avg: "$temperature_C" },
      meters: { $addToSet: "$meterId" }
    }
  },
  { $sort: { avgTemperature_C: -1 } }
]);

// Hourly energy consumption trend per meter (bucket timestamps by hour)
db.energy_readings.aggregate([
  {
    $group: {
      _id: {
        meterId: "$meterId",
        hour: { $dateTrunc: { date: "$timestamp", unit: "hour" } }
      },
      hourlyEnergy_kWh: { $sum: "$energy_kWh" },
      avgTemp_C: { $avg: "$temperature_C" }
    }
  },
  { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
]);

// Compare average energy usage across meters for ranking
db.energy_readings.aggregate([
  {
    $group: {
      _id: "$meterId",
      avgEnergy_kWh: { $avg: "$energy_kWh" },
      peakEnergy_kWh: { $max: "$energy_kWh" }
    }
  },
  { $sort: { avgEnergy_kWh: -1 } }
]);

// Detect hours where any reading crosses the high-usage threshold (> 6 kWh)
db.energy_readings.aggregate([
  { $match: { energy_kWh: { $gt: 6 } } },
  {
    $addFields: {
      hour: { $dateTrunc: { date: "$timestamp", unit: "hour" } }
    }
  },
  {
    $group: {
      _id: { meterId: "$meterId", hour: "$hour" },
      maxEnergy_kWh: { $max: "$energy_kWh" },
      locations: { $addToSet: "$location" }
    }
  },
  { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
]);
