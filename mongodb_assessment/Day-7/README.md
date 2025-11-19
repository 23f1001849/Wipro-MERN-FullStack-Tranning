# Day 7 - MongoDB Data Modeling and CRUD Operations

## Assignment Overview
**Duration:** 50-60 Minutes  
**Focus Areas:** Introduction to NoSQL, MongoDB CRUD Operations, and Data Modeling

## Scenario
You have joined **BookVerse**, a startup building a digital platform for managing online book collections, authors, and user reviews. As part of the backend team, you are responsible for creating and managing the MongoDB database that powers the platform's data layer.

## Setup Steps

### Prerequisites
1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - For Windows: Run the installer and follow the setup wizard
   - For macOS: `brew tap mongodb/brew && brew install mongodb-community`
   - For Linux: Follow the official installation guide for your distribution

2. **Install MongoDB Compass (Optional but Recommended)**
   - Download from: https://www.mongodb.com/try/download/compass
   - GUI tool for easier database visualization and management

3. **Verify Installation**
   ```bash
   # Start MongoDB service
   # Windows: MongoDB should start automatically as a service
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   
   # Verify MongoDB is running
   mongosh --version
   ```

### Database Setup
1. Open MongoDB Shell:
   ```bash
   mongosh
   ```

2. Create the database:
   ```javascript
   use BookVerseDB
   ```

## User Stories and Tasks

### User Story 1 — Database Setup and Data Modeling

**Objective:** Design MongoDB collections to efficiently represent books, authors, and reviews in a NoSQL structure.

**Tasks:**
1. Create a new MongoDB database named `BookVerseDB`
2. Define the following collections with proper schema modeling:
   - **Authors:** `{ _id, name, nationality, birthYear }`
   - **Books:** `{ _id, title, genre, publicationYear, authorId, ratings: [ { user, score, comment } ] }`
   - **Users:** `{ _id, name, email, joinDate }`
3. Implement one-to-many relationships using references (authorId) and embedded documents (ratings)
4. Insert sample documents (at least 3 authors, 5 books, 3 users)

**Implementation:** See `data-modeling.js` for complete code

### User Story 2 — CRUD Operations

**Objective:** Perform basic Create, Read, Update, and Delete operations on collections.

**Tasks:**
1. Insert new users and books
2. Retrieve all books of genre "Science Fiction"
3. Update the publicationYear of one book
4. Delete one user record
5. Add a new rating to a book using `$push` operator

**Implementation:** See `crud-operations.js` for complete code

### User Story 3 — Querying and Filtering Data

**Objective:** Query data for the web interface based on filters.

**Tasks:**
1. Retrieve all books published after 2015
2. Find authors who have written books in the "Fantasy" genre
3. Retrieve all users who joined within the last 6 months
4. Find books with an average rating greater than 4

**Implementation:** See `queries.js` for complete code

## Expected Deliverables

1. **Screenshots:**
   - Database and collection creation
   - CRUD and filter query outputs

2. **Exported Data:**
   - Exported .json files for collections (Authors, Books, Users)
   - Command to export: `mongoexport --db BookVerseDB --collection Authors --out authors.json`

3. **Documentation:**
   - Summary of queries used (provided in this README)

## Self-Evaluation Checklist

| Criteria | Self-Rating (✔/✘) | Notes |
|----------|-------------------|-------|
| Collections follow logical data modeling structure | | |
| Used appropriate references and embedded documents | | |
| CRUD operations performed successfully | | |
| Queries return correct results | | |
| Data export completed | | |

## Running the Assignment

1. Start MongoDB:
   ```bash
   # Make sure MongoDB is running
   mongosh
   ```

2. Execute the scripts in order:
   ```bash
   # Load and execute data modeling script
   mongosh BookVerseDB < data-modeling.js
   
   # Execute CRUD operations
   mongosh BookVerseDB < crud-operations.js
   
   # Execute queries
   mongosh BookVerseDB < queries.js
   ```

## Exporting Collections

```bash
# Export Authors collection
mongoexport --db BookVerseDB --collection authors --out authors.json --jsonArray

# Export Books collection
mongoexport --db BookVerseDB --collection books --out books.json --jsonArray

# Export Users collection
mongoexport --db BookVerseDB --collection users --out users.json --jsonArray
```

## Concepts Covered
- NoSQL structure and data modeling
- One-to-many relationships
- Embedded documents vs. references
- CRUD operations
- Query filters and conditional operators
- Nested field access
