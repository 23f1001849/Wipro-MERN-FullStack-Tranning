# Day 8 - Indexing, Aggregation, and MongoDB Atlas

## Assignment Overview
**Duration:** 50-60 Minutes  
**Focus Areas:** Indexing, Query Optimization, Aggregation Framework, and MongoDB Atlas

## Scenario
**BookVerse** is now scaling, and you are tasked with optimizing database performance and enabling analytics using MongoDB's advanced features. You will implement indexes, run aggregation pipelines, and connect your local database to MongoDB Atlas.

## Setup Steps

### Prerequisites
1. **Complete Day 7 Assignment First**
   - Ensure you have completed Day 7 and have the BookVerseDB database set up
   - If not, run the Day 7 scripts first to create the database

2. **MongoDB Atlas Account (Free)**
   - Sign up at: https://www.mongodb.com/cloud/atlas/register
   - Free tier is sufficient for this assignment

3. **MongoDB Tools**
   - Ensure `mongosh` (MongoDB Shell) is installed
   - Ensure `mongoexport` and `mongoimport` are installed
   - Download MongoDB Database Tools if needed: https://www.mongodb.com/try/download/database-tools

### Verify Setup
```bash
# Check MongoDB Shell
mongosh --version

# Check MongoDB Database Tools
mongoexport --version
mongoimport --version
```

## User Stories and Tasks

### User Story 1 — Indexing and Query Optimization

**Objective:** Optimize frequently used queries to improve database performance.

**Tasks:**
1. Identify frequently queried fields (e.g., genre, authorId, ratings.score)
2. Create indexes using `createIndex()` method
3. Compare query performance using `explain("executionStats")` before and after indexing
4. Drop an unnecessary index using `dropIndex()` and note its impact

**Implementation:** See `indexing.js` for complete code

**Key Concepts:**
- Index creation and management
- Query execution analysis
- Performance comparison
- Index types (single field, compound)

### User Story 2 — Aggregation Framework

**Objective:** Generate reports about books and their ratings using MongoDB's aggregation pipeline.

**Tasks:**
1. Calculate average rating per book using `$unwind`, `$group`, and `$avg`
2. Retrieve top 3 highest-rated books
3. Count the number of books published per genre
4. Find authors who have more than 2 books published
5. Display total reward points (sum of all ratings) received by each author

**Implementation:** See `aggregation.js` for complete code

**Key Concepts:**
- Aggregation pipeline stages
- `$unwind`, `$group`, `$project`, `$sort`, `$limit`
- Grouping and calculations
- Multi-stage pipelines

### User Story 3 — MongoDB Atlas Connection

**Objective:** Deploy and connect the database to MongoDB Atlas for cloud management.

**Step-by-Step Guide:**

#### 1. Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create a free account
3. Click "Build a Database"
4. Select "M0 FREE" tier
5. Choose a cloud provider and region (select the closest to you)
6. Name your cluster (e.g., "BookVerseCluster")
7. Click "Create"

#### 2. Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username (e.g., "bookverse_user")
5. Set a strong password (save it securely!)
6. Grant "Read and write to any database" privilege
7. Click "Add User"

#### 3. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development/testing)
   - Or add your specific IP address
4. Click "Confirm"

#### 4. Get Connection String
1. Go back to "Database" (Clusters view)
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Connection string format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/`

#### 5. Create Database in Atlas
```javascript
// Connect using mongosh
mongosh "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/"

// Create database
use BookVerseCloudDB
```

#### 6. Import Collections to Atlas
```bash
# Export from local database
mongoexport --db BookVerseDB --collection authors --out authors.json --jsonArray
mongoexport --db BookVerseDB --collection books --out books.json --jsonArray
mongoexport --db BookVerseDB --collection users --out users.json --jsonArray

# Import to Atlas (replace with your connection string)
mongoimport --uri "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/BookVerseCloudDB" \
  --collection authors --file authors.json --jsonArray

mongoimport --uri "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/BookVerseCloudDB" \
  --collection books --file books.json --jsonArray

mongoimport --uri "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/BookVerseCloudDB" \
  --collection users --file users.json --jsonArray
```

#### 7. Connect with MongoDB Compass
1. Open MongoDB Compass
2. Click "New Connection"
3. Paste your connection string
4. Click "Connect"
5. Navigate to BookVerseCloudDB database

#### 8. Connect with Node.js (Optional)
See `atlas-connection.js` for a Node.js connection example.

**Setup for Node.js:**
```bash
# Initialize Node.js project (if not already done)
npm init -y

# Install MongoDB driver
npm install mongodb
```

## Expected Deliverables

1. **Screenshots:**
   - Index creation and `explain()` output comparison
   - Aggregation pipeline results
   - MongoDB Atlas dashboard showing:
     - Cluster overview
     - Database collections
     - Successful connection

2. **Code Files:**
   - `indexing.js` - Index creation and query optimization
   - `aggregation.js` - Aggregation queries
   - `atlas-connection.js` - Connection example (Node.js)

3. **Exported Data:**
   - JSON files of aggregation results

## Running the Assignment

### Part 1: Indexing
```bash
# Run indexing script
mongosh BookVerseDB < indexing.js
```

### Part 2: Aggregation
```bash
# Run aggregation script
mongosh BookVerseDB < aggregation.js
```

### Part 3: Atlas Connection
```bash
# Connect to Atlas using mongosh
mongosh "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/BookVerseCloudDB"

# Or run Node.js connection test
node atlas-connection.js
```

## Self-Evaluation Checklist

| Criteria | Self-Rating (✔/✘) | Notes |
|----------|-------------------|-------|
| Indexes created and analyzed with explain plans | | |
| Query optimization results interpreted correctly | | |
| Aggregation pipelines constructed using correct stages | | |
| Results correctly reflect analytical objectives | | |
| Atlas setup and connection completed successfully | | |

## Bonus Challenge (Optional)

1. **Compound Index:**
   - Create a compound index on `{ genre: 1, publicationYear: -1 }`
   - Analyze its impact on queries that filter by both fields

2. **Stored Aggregation:**
   - Build an aggregation query to return the top-rated author by average book score
   - Save it as a view or function

See `bonus-challenges.js` for implementation examples.

## Concepts Covered
- Index creation and types
- Query performance analysis with `explain()`
- Aggregation pipeline stages
- Data grouping and calculations
- MongoDB Atlas cloud setup
- Cloud database connection
- Data import/export
- Production deployment considerations

## Troubleshooting

### Connection Issues
- **IP Whitelist:** Ensure your IP is added to Atlas Network Access
- **Credentials:** Double-check username and password
- **Connection String:** Ensure password is URL-encoded if it contains special characters

### Import/Export Issues
- **File Paths:** Use absolute paths or ensure you're in the correct directory
- **JSON Format:** Use `--jsonArray` flag for array format

### Performance
- **Indexes Not Working:** Run `explain()` to verify index usage
- **Slow Queries:** Check if indexes are properly created with `db.collection.getIndexes()`
