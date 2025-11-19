use BookVerseDB;

print("\n AGGREGATION FRAMEWORK \n");

print(" Task 1: AVERAGE RATING PER BOOK \n");
print("Using $unwind, $group, and $avg to calculate average ratings:\n");

const avgRatingPipeline = db.books.aggregate([
   { $unwind: "$ratings" },

  { 
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      genre: { $first: "$genre" },
      avgRating: { $avg: "$ratings.score" },
      numRatings: { $sum: 1 }
    }
  },
  

  { $sort: { avgRating: -1 } },
  

  {
    $project: {
      _id: 0,
      title: 1,
      genre: 1,
      avgRating: { $round: ["$avgRating", 2] },
      numRatings: 1
    }
  }
]);

print("Average Ratings by Book:");
avgRatingPipeline.forEach(function(book) {
  print("\nBook: " + book.title);
  print("  Genre: " + book.genre);
  print("  Average Rating: " + book.avgRating + " / 5.0");
  print("  Number of Ratings: " + book.numRatings);
});
print("");

print(" Task 2: TOP 3 HIGHEST-RATED BOOKS \n");

const top3Books = db.books.aggregate([
  { $unwind: "$ratings" },
  { 
    $group: {
      _id: "$_id",
      title: { $first: "$title" },
      genre: { $first: "$genre" },
      avgRating: { $avg: "$ratings.score" }
    }
  },
  { $sort: { avgRating: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      title: 1,
      genre: 1,
      avgRating: { $round: ["$avgRating", 2] }
    }
  }
]);

print("Top 3 Highest-Rated Books:");
let rank = 1;
top3Books.forEach(function(book) {
  print("\n" + rank + ". " + book.title);
  print("   Genre: " + book.genre);
  print("   Average Rating: " + book.avgRating + " / 5.0");
  rank++;
});
print("");


print(" Task 3: BOOKS COUNT PER GENRE \n");

const booksByGenre = db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      count: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  { $sort: { count: -1 } }
]);

print("Number of Books by Genre:");
booksByGenre.forEach(function(genre) {
  print("\nGenre: " + genre._id);
  print("  Count: " + genre.count);
  print("  Books:");
  genre.books.forEach(function(book) {
    print("    - " + book);
  });
});
print("");

print(" Task 4: AUTHORS WITH MORE THAN 2 BOOKS \n");

const prolificAuthors = db.books.aggregate([
  {
    $group: {
      _id: "$authorId",
      bookCount: { $sum: 1 },
      bookTitles: { $push: "$title" }
    }
  },
  {
    $match: {
      bookCount: { $gt: 2 }
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
      bookCount: 1,
      bookTitles: 1
    }
  },
  { $sort: { bookCount: -1 } }
]);

print("Authors with more than 2 books published:");
let authorCount = 0;
prolificAuthors.forEach(function(author) {
  authorCount++;
  print("\n" + authorCount + ". Author: " + author.authorName);
  print("   Nationality: " + author.nationality);
  print("   Books Published: " + author.bookCount);
  print("   Titles:");
  author.bookTitles.forEach(function(title) {
    print("     - " + title);
  });
});

if (authorCount  0) {
  print("No authors found with more than 2 books.");
}
print("");

print(" Task 5: TOTAL REWARD POINTS (SUM OF RATINGS) PER AUTHOR \n");

const authorRewards = db.books.aggregate([
  { $unwind: "$ratings" },
  {
    $group: {
      _id: "$authorId",
      totalRewardPoints: { $sum: "$ratings.score" },
      totalRatings: { $sum: 1 },
      avgRating: { $avg: "$ratings.score" }
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
      totalRewardPoints: 1,
      totalRatings: 1,
      avgRating: { $round: ["$avgRating", 2] }
    }
  },

  { $sort: { totalRewardPoints: -1 } }
]);

print("Total Reward Points by Author:");
print("(Reward Points = Sum of all rating scores received)\n");

authorRewards.forEach(function(author) {
  print("Author: " + author.authorName);
  print("  Nationality: " + author.nationality);
  print("  Total Reward Points: " + author.totalRewardPoints);
  print("  Total Ratings Received: " + author.totalRatings);
  print("  Average Rating: " + author.avgRating + " / 5.0");
  print("");
});


print(" BONUS: COMPREHENSIVE BOOK STATISTICS \n");

const comprehensiveStats = db.books.aggregate([
  {
    $facet: {
      "overallStats": [
        {
          $group: {
            _id: null,
            totalBooks: { $sum: 1 },
            avgPublicationYear: { $avg: "$publicationYear" },
            oldestBook: { $min: "$publicationYear" },
            newestBook: { $max: "$publicationYear" }
          }
        }
      ],

      "genreStats": [
        { $unwind: "$ratings" },
        {
          $group: {
            _id: "$genre",
            bookCount: { $sum: 1 },
            avgRating: { $avg: "$ratings.score" }
          }
        },
        { $sort: { avgRating: -1 } }
      ],

      "activeUsers": [
        { $unwind: "$ratings" },
        {
          $group: {
            _id: "$ratings.user",
            ratingsGiven: { $sum: 1 },
            avgScoreGiven: { $avg: "$ratings.score" }
          }
        },
        { $sort: { ratingsGiven: -1 } },
        { $limit: 3 }
      ]
    }
  }
]);

comprehensiveStats.forEach(function(stats) {
  print("Overall Statistics:");
  stats.overallStats.forEach(function(s) {
    print("  Total Books: " + s.totalBooks);
    print("  Oldest Publication Year: " + s.oldestBook);
    print("  Newest Publication Year: " + s.newestBook);
  });
  
  print("\nGenre Statistics:");
  stats.genreStats.forEach(function(g) {
    print("  " + g._id + ": " + g.bookCount + " books (Avg Rating: " + g.avgRating.toFixed(2) + ")");
  });
  
  print("\nMost Active Users:");
  stats.activeUsers.forEach(function(u) {
    print("  " + u._id + ": " + u.ratingsGiven + " ratings given (Avg: " + u.avgScoreGiven.toFixed(2) + ")");
  });
});

print("\n AGGREGATION FRAMEWORK COMPLETE \n");

// Summary
print("Summary of aggregation operations:");
print("Calculated average rating per book using $unwind and $group");
print("Retrieved top 3 highest-rated books with $sort and $limit");
print("Counted books per genre with grouping");
print("Found authors with > 2 books using $match");
print("Calculated total reward points per author");
print("Demonstrated complex multi-facet aggregation");
print("\nAggregation stages used:");
print("- $unwind: Deconstruct arrays");
print("- $group: Group documents and perform calculations");
print("- $match: Filter documents");
print("- $lookup: Join collections");
print("- $project: Shape output documents");
print("- $sort: Order results");
print("- $limit: Restrict number of results");
print("- $facet: Multiple pipelines in parallel");
