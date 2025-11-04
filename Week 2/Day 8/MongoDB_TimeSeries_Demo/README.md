# Smart Energy Monitoring – Time Series & Aggregations

## Demo overview
- MongoDB time-series collection that stores per-minute energy usage from GreenPulse Energy smart meters.
- Includes sample dataset (`data/energy_readings.json`) with multiple sites and realistic readings.
- Handy Mongo shell scripts under `queries/` demonstrate CRUD, aggregations, and index tuning.
- Screenshots folder reserved for Compass captures of aggregation results and index statistics.

## Steps to create time-series collection
```javascript
use greenpulse_energy;

db.createCollection("energy_readings", {
  timeseries: {
    timeField: "timestamp",
    metaField: "meterId",
    granularity: "minutes"
  }
});

mongoimport \
  --db greenpulse_energy \
  --collection energy_readings \
  --file data/energy_readings.json \
  --jsonArray;
```

## Sample aggregation outputs
### Total energy consumption per meter
```javascript
db.energy_readings.aggregate([
  { $group: { _id: "$meterId", totalEnergy_kWh: { $sum: "$energy_kWh" } } },
  { $sort: { totalEnergy_kWh: -1 } }
]);
```
_Sample result_
```json
[
  { "_id": "MTR004", "totalEnergy_kWh": 20.6 },
  { "_id": "MTR002", "totalEnergy_kWh": 23.4 },
  { "_id": "MTR003", "totalEnergy_kWh": 13.0 },
  { "_id": "MTR001", "totalEnergy_kWh": 19.1 }
]
```

### Detecting high usage hours (> 6 kWh)
```javascript
db.energy_readings.aggregate([
  { $match: { energy_kWh: { $gt: 6 } } },
  { $addFields: { hour: { $dateTrunc: { date: "$timestamp", unit: "hour" } } } },
  { $group: { _id: { meterId: "$meterId", hour: "$hour" }, maxEnergy_kWh: { $max: "$energy_kWh" } } },
  { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
]);
```
_Sample result_
```json
[
  {
    "_id": {
      "meterId": "MTR004",
      "hour": { "$date": 1730196000000 }
    },
    "maxEnergy_kWh": 7.3
  }
]
```

Add your Compass screenshots to `screenshots/aggregation_results.png` and `screenshots/compass_index_view.png` after running the pipelines.

## Best practices summary
- Use time-series collections with an appropriate `granularity` (`minutes` here) to leverage automatic bucketing and compression.
- Store stable metadata (such as `meterId` or `location`) in a dedicated meta field; it keeps bucket headers small and speeds up filtered reads.
- Prefer range queries anchored on the time field and projected indexes (`timestamp` or `{ meterId, timestamp }`) to avoid bucket scans.
- Downsample regularly when keeping long-term history (e.g., hourly or daily rollups) to balance query speed and storage.
- Monitor index usage with `explain("executionStats")` and prune unused indexes to reduce write amplification.
