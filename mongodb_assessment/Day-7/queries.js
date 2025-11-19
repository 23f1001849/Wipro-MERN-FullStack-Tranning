
use BookVerseDB;

print("\nQUERYING AND FILTERING DATA\n");

print("Task 1: BOOKS PUBLISHED AFTER 2015\n");
print("Finding books with publicationYear > 2015:");

const booksAfter2015 = db.books.find({ publicationYear: { $gt: 2015 } });
let count1 = 0;
booksAfter2015.forEach(function(book) {
  count1++;
  print("\nBook " + count1 + ":");
  print("  Title: " + book.title);
  print("  Genre: " + book.genre);
  print("  Publication Year: " + book.publicationYear);
});

if (count1 === 0) {
  print("No books found published after 2015");
}
print("");


print("Task 2: AUTHORS WHO WROTE FANTASY BOOKS\n");
print("Finding authors with Fantasy genre books:");

const fantasyBooks = db.books.find({ genre: "Fantasy" }).toArray();

const fantasyAuthorIds = [...new Set(fantasyBooks.map(book => book.authorId))];

print("\nAuthors who have written Fantasy books:");
fantasyAuthorIds.forEach(function(authorId) {
  const author = db.authors.findOne({ _id: authorId });
  if (author) {
    print("\nAuthor: " + author.name);
    print("  Nationality: " + author.nationality);
    print("  Birth Year: " + author.birthYear);

    const authorFantasyBooks = db.books.find({ 
      authorId: authorId, 
      genre: "Fantasy" 
    }).toArray();
    
    print("  Fantasy Books:");
    authorFantasyBooks.forEach(function(book) {
      print("    - " + book.title + " (" + book.publicationYear + ")");
    });
  }
});
print("");



print("Task 3: USERS WHO JOINED IN LAST 6 MONTHS\n");

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

print("Current date: " + new Date().toISOString().split('T')[0]);
print("Six months ago: " + sixMonthsAgo.toISOString().split('T')[0]);
print("\nUsers who joined after " + sixMonthsAgo.toISOString().split('T')[0] + ":");

const recentUsers = db.users.find({ joinDate: { $gte: sixMonthsAgo } });
let userCount = 0;
recentUsers.forEach(function(user) {
  userCount++;
  print("\nUser " + userCount + ":");
  print("  Name: " + user.name);
  print("  Email: " + user.email);
  print("  Join Date: " + user.joinDate.toISOString().split('T')[0]);
});

if (userCount === 0) {
  print("No users found who joined in the last 6 months");
}
print("");



print("Task 4: BOOKS WITH AVERAGE RATING > 4\n");
print("Calculating average ratings for all books:\n");

// Get all books and calculate average ratings
const allBooks = db.books.find().toArray();
const highRatedBooks = [];

allBooks.forEach(function(book) {
  if (book.ratings && book.ratings.length > 0) {
    // Calculate average rating
    const totalScore = book.ratings.reduce(function(sum, rating) {
      return sum + rating.score;
    }, 0);
    const avgRating = totalScore / book.ratings.length;

    if (avgRating > 4) {
      highRatedBooks.push({
        title: book.title,
        genre: book.genre,
        avgRating: avgRating,
        numRatings: book.ratings.length
      });
    }

    print("Book: " + book.title);
    print("  Average Rating: " + avgRating.toFixed(2));
    print("  Number of Ratings: " + book.ratings.length);
    print("  Status: " + (avgRating > 4 ? "✓ Above 4.0" : "Below 4.0"));
    print("");
  }
});

print("\nBOOKS WITH AVERAGE RATING > 4.0");
if (highRatedBooks.length > 0) {
  highRatedBooks.forEach(function(book, index) {
    print("\n" + (index + 1) + ". " + book.title);
    print("   Genre: " + book.genre);
    print("   Average Rating: " + book.avgRating.toFixed(2));
    print("   Number of Ratings: " + book.numRatings);
  });
} else {
  print("No books found with average rating > 4.0");
}

print("\nQUERYING AND FILTERING COMPLETE\n");
