// Day 8 - User Story 1: Indexing and Query Optimization
// MongoDB Indexing Script for BookVerseDB

use BookVerseDB;

print("\n INDEXING AND QUERY OPTIMIZATION \n");

print(" Task 1: FREQUENTLY QUERIED FIELDS \n");
print("Based on common queries, the following fields are frequently accessed:");
print("1. genre - For filtering books by genre");
print("2. authorId - For finding books by author");
print("3. ratings.score - For finding highly rated books");
print("4. publicationYear - For filtering books by publication date");
print("");


print(" Task 2 & 3: CREATE INDEXES AND COMPARE PERFORMANCE \n");


print("Current indexes on books collection:");
db.books.getIndexes().forEach(printjson);
print("");

print(" Performance Test 1: Query by Genre (WITHOUT INDEX) \n");
print("Query: Find all Fantasy books");
print("Execution stats BEFORE creating index:\n");

const explainBefore1 = db.books.find({ genre: "Fantasy" }).explain("executionStats");
print("Execution Time: " + explainBefore1.executionStats.executionTimeMillis + " ms");
print("Documents Examined: " + explainBefore1.executionStats.totalDocsExamined);
print("Documents Returned: " + explainBefore1.executionStats.nReturned);
print("Execution Stage: " + explainBefore1.executionStats.executionStages.stage);
print("");

print("Creating index on 'genre' field...");
db.books.createIndex({ genre: 1 });
print("Index created successfully!\n");

print("Execution stats AFTER creating index:\n");
const explainAfter1 = db.books.find({ genre: "Fantasy" }).explain("executionStats");
print("Execution Time: " + explainAfter1.executionStats.executionTimeMillis + " ms");
print("Documents Examined: " + explainAfter1.executionStats.totalDocsExamined);
print("Documents Returned: " + explainAfter1.executionStats.nReturned);
print("Execution Stage: " + explainAfter1.executionStats.executionStages.stage);
print("Index Used: " + (explainAfter1.executionStats.executionStages.stage  "IXSCAN" ? "YES" : "NO"));
print("\n Performance improved by using index!\n");

print(" Performance Test 2: Query by AuthorId \n");


const sampleAuthor = db.authors.findOne({ name: "J.R.R. Tolkien" });
print("Testing with Author: " + sampleAuthor.name);
print("Author ID: " + sampleAuthor._id + "\n");

print("Execution stats BEFORE creating index:");
const explainBefore2 = db.books.find({ authorId: sampleAuthor._id }).explain("executionStats");
print("Execution Time: " + explainBefore2.executionStats.executionTimeMillis + " ms");
print("Documents Examined: " + explainBefore2.executionStats.totalDocsExamined);
print("");

print("Creating index on 'authorId' field...");
db.books.createIndex({ authorId: 1 });
print("Index created successfully!\n");

print("Execution stats AFTER creating index:");
const explainAfter2 = db.books.find({ authorId: sampleAuthor._id }).explain("executionStats");
print("Execution Time: " + explainAfter2.executionStats.executionTimeMillis + " ms");
print("Documents Examined: " + explainAfter2.executionStats.totalDocsExamined);
print("Index Used: " + (explainAfter2.executionStats.executionStages.stage  "IXSCAN" ? "YES" : "NO"));
print("\n Query optimized with authorId index!\n");

print(" Performance Test 3: Index on Nested Field (ratings.score) \n");

print("Creating index on 'ratings.score' field...");
db.books.createIndex({ "ratings.score": 1 });
print("Index created successfully!");
print("This index helps queries that filter or sort by rating scores.\n");

print(" Performance Test 4: Compound Index \n");

print("Creating compound index on { publicationYear: -1, genre: 1 }...");
db.books.createIndex({ publicationYear: -1, genre: 1 });
print("Compound index created successfully!");
print("This index optimizes queries that filter by both publicationYear and genre.\n");

print("Testing compound index with query:");
const compoundQuery = db.books.find({ 
  publicationYear: { $gte: 1950 }, 
  genre: "Fantasy" 
}).explain("executionStats");

print("Documents Examined: " + compoundQuery.executionStats.totalDocsExamined);
print("Index Used: " + (compoundQuery.executionStats.executionStages.stage  "IXSCAN" ? "YES" : "NO"));
print("");

print(" ALL INDEXES ON BOOKS COLLECTION \n");
db.books.getIndexes().forEach(function(index) {
  print("Index Name: " + index.name);
  print("Keys: " + JSON.stringify(index.key));
  print("---");
});
print("");


print(" Task 4: DROP AN UNNECESSARY INDEX \n");

print("Current indexes count: " + db.books.getIndexes().length);
print("\nDropping the 'ratings.score' index as it's less frequently used...");

db.books.dropIndex({ "ratings.score": 1 });
print("Index dropped successfully!\n");

print("Remaining indexes count: " + db.books.getIndexes().length);
print("\nRemaining indexes:");
db.books.getIndexes().forEach(function(index) {
  print("- " + index.name + ": " + JSON.stringify(index.key));
});

print("\n INDEXING AND OPTIMIZATION COMPLETE \n");

// Summary
print("Summary:");
print(" Analyzed query performance before and after indexing");
print(" Created single-field indexes: genre, authorId");
print(" Created compound index: publicationYear + genre");
print(" Tested index usage with explain()");
print(" Dropped unnecessary index (ratings.score)");
print("\nKey Insights:");
print("- Indexes significantly reduce documents examined");
print("- Execution stage changes from COLLSCAN to IXSCAN");
print("- Compound indexes help multi-field queries");
print("- Remove unused indexes to save storage and write performance");
