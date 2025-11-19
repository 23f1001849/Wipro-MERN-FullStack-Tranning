
use BookVerseDB;

print("\nBONUS CHALLENGES\n");


print(" BONUS CHALLENGE 1: COMPOUND INDEX \n");


print("Creating compound index on { genre: 1, publicationYear: -1 }...");
db.books.createIndex({ genre: 1, publicationYear: -1 });
print(" Compound index created!\n");


print("Test 1: Query filtering by genre and sorting by publication year");
const test1Query = db.books.find({ 
  genre: "Fantasy" 
}).sort({ 
  publicationYear: -1 
});

print("\nResults (newest Fantasy books first):");
test1Query.forEach(function(book) {
  print("  " + book.title + " (" + book.publicationYear + ")");
});

print("\nExecution Analysis:");
const test1Explain = db.books.find({ 
  genre: "Fantasy" 
}).sort({ 
  publicationYear: -1 
}).explain("executionStats");

print("Execution Stage: " + test1Explain.executionStats.executionStages.stage);
print("Index Used: " + JSON.stringify(test1Explain.executionStats.executionStages.indexName || "None"));
print("Documents Examined: " + test1Explain.executionStats.totalDocsExamined);
print("Documents Returned: " + test1Explain.executionStats.nReturned);

print("\n\nTest 2: Query filtering by both genre and publicationYear");
const test2Query = db.books.find({
  genre: "Fantasy",
  publicationYear: { $gte: 1950 }
}).sort({
  publicationYear: -1
});

print("\nResults (Fantasy books from 1950 onwards):");
test2Query.forEach(function(book) {
  print("  " + book.title + " (" + book.publicationYear + ")");
});

print("\nExecution Analysis:");
const test2Explain = db.books.find({
  genre: "Fantasy",
  publicationYear: { $gte: 1950 }
}).sort({
  publicationYear: -1
}).explain("executionStats");

print("Execution Stage: " + test2Explain.executionStats.executionStages.stage);
print("Index Used: " + JSON.stringify(test2Explain.executionStats.executionStages.indexName || "None"));
print("Documents Examined: " + test2Explain.executionStats.totalDocsExamined);

print("\n Compound index significantly improves performance for multi-field queries!");
print("  - Filters by genre using the first part of the index");
print("  - Sorts by publicationYear using the second part");
print("  - No separate sorting operation needed\n");

print(" BONUS CHALLENGE 2: TOP-RATED AUTHOR \n");

print("Building aggregation to find the top-rated author by average book score:\n");

const topRatedAuthor = db.books.aggregate([

  { 
    $unwind: "$ratings" 
  },
  

  {
    $group: {
      _id: {
        bookId: "$_id",
        authorId: "$authorId"
      },
      bookTitle: { $first: "$title" },
      avgBookRating: { $avg: "$ratings.score" }
    }
  },

  {
    $group: {
      _id: "$_id.authorId",
      avgAuthorRating: { $avg: "$avgBookRating" },
      bookCount: { $sum: 1 },
      books: { 
        $push: {
          title: "$bookTitle",
          avgRating: "$avgBookRating"
        }
      }
    }
  },

  {
    $lookup: {
      from: "authors",
      localField: "_id",
      foreignField: "_id",
      as: "authorInfo"
    }
  },

  { $unwind: "$authorInfo" },

  { $sort: { avgAuthorRating: -1 } },

  { $limit: 1 },

  {
    $project: {
      _id: 0,
      authorName: "$authorInfo.name",
      nationality: "$authorInfo.nationality",
      birthYear: "$authorInfo.birthYear",
      avgAuthorRating: { $round: ["$avgAuthorRating", 2] },
      bookCount: 1,
      books: {
        $map: {
          input: "$books",
          as: "book",
          in: {
            title: "$$book.title",
            avgRating: { $round: ["$$book.avgRating", 2] }
          }
        }
      }
    }
  }
]);

print("🏆 TOP-RATED AUTHOR BY AVERAGE BOOK SCORE:\n");
topRatedAuthor.forEach(function(author) {
  print("Author: " + author.authorName);
  print("Nationality: " + author.nationality);
  print("Birth Year: " + author.birthYear);
  print("Average Rating Across All Books: " + author.avgAuthorRating + " / 5.0");
  print("Number of Books: " + author.bookCount);
  print("\nBooks:");
  author.books.forEach(function(book, index) {
    print("  " + (index + 1) + ". " + book.title);
    print("     Average Rating: " + book.avgRating + " / 5.0");
  });
});


print("\n\n Creating View for Top-Rated Authors \n");

try {
  db.topRatedAuthorsView.drop();
} catch (e) {
}


db.createView(
  "topRatedAuthorsView",
  "books",
  [
    { $unwind: "$ratings" },
    {
      $group: {
        _id: {
          bookId: "$_id",
          authorId: "$authorId"
        },
        bookTitle: { $first: "$title" },
        avgBookRating: { $avg: "$ratings.score" }
      }
    },
    {
      $group: {
        _id: "$_id.authorId",
        avgAuthorRating: { $avg: "$avgBookRating" },
        bookCount: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "_id",
        foreignField: "_id",
        as: "authorInfo"
      }
    },
    { $unwind: "$authorInfo" },
    {
      $project: {
        _id: 0,
        authorName: "$authorInfo.name",
        nationality: "$authorInfo.nationality",
        avgAuthorRating: { $round: ["$avgAuthorRating", 2] },
        bookCount: 1
      }
    },
    { $sort: { avgAuthorRating: -1 } }
  ]
);

print("View 'topRatedAuthorsView' created successfully!");
print("\nYou can now query this view like a regular collection:");
print("  db.topRatedAuthorsView.find()");
print("\nQuerying the view:\n");

db.topRatedAuthorsView.find().forEach(function(author) {
  print("Author: " + author.authorName);
  print("  Nationality: " + author.nationality);
  print("  Avg Rating: " + author.avgAuthorRating + " / 5.0");
  print("  Books: " + author.bookCount);
  print("");
});

print(" BONUS: TEXT INDEX FOR SEARCH \n");

print("Creating text index on book titles for full-text search...");
db.books.createIndex({ title: "text", genre: "text" });
print(" Text index created!\n");

print("Example text search for 'hobbit':");
db.books.find({ $text: { $search: "hobbit" } }).forEach(function(book) {
  print("  Found: " + book.title + " (" + book.genre + ")");
});

print("\nExample text search for 'game throne':");
db.books.find({ $text: { $search: "game throne" } }).forEach(function(book) {
  print("  Found: " + book.title + " (" + book.genre + ")");
});

print("\n BONUS CHALLENGES COMPLETE \n");

// Summary
print("Summary of bonus challenges:");
print(" Created compound index on { genre: 1, publicationYear: -1 }");
print(" Analyzed compound index impact with explain()");
print(" Built aggregation to find top-rated author");
print(" Created a view for easy access to author ratings");
print(" Created text index for full-text search");
print("\nAdvanced concepts covered:");
print("- Compound indexes for multi-field queries");
print("- Index sort optimization");
print("- Complex multi-stage aggregations");
print("- View creation for reusable queries");
print("- Text indexes for search functionality");
