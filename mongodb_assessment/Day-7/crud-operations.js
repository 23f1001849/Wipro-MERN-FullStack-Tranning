

use BookVerseDB;

print("Task 1: INSERT NEW USERS AND BOOKS\n");


print("Inserting new user:");
db.users.insertOne({
  name: "Emma Davis",
  email: "emma.davis@email.com",
  joinDate: new Date("2024-06-15")
});
print("New user inserted: Emma Davis\n");

const tolkien = db.authors.findOne({ name: "J.R.R. Tolkien" });
print("Inserting new book:");
db.books.insertOne({
  title: "The Silmarillion",
  genre: "Fantasy",
  publicationYear: 1977,
  authorId: tolkien._id,
  ratings: [
    {
      user: "Emma Davis",
      score: 4,
      comment: "Dense but rewarding mythology."
    }
  ]
});
print("New book inserted: The Silmarillion\n");

print("Task 2: RETRIEVE SCIENCE FICTION BOOKS\n");
print("Books with genre 'Science Fiction':");
db.books.find({ genre: "Science Fiction" }).forEach(printjson);
print("");


print("Task 3: UPDATE PUBLICATION YEAR\n");

print("Before update:");
const bookToUpdate = db.books.findOne({ title: "A Game of Thrones" });
printjson(bookToUpdate);

db.books.updateOne(
  { title: "A Game of Thrones" },
  { $set: { publicationYear: 1996 } }
);

print("\nAfter update:");
const updatedBook = db.books.findOne({ title: "A Game of Thrones" });
printjson(updatedBook);
print("Publication year updated from 2016 to 1996\n");



print("Task 4: DELETE USER RECORD\n");

print("Users before deletion:");
print("Total users: " + db.users.countDocuments());

db.users.deleteOne({ name: "David Brown" });
print("\nUser 'David Brown' deleted");

print("\nUsers after deletion:");
print("Total users: " + db.users.countDocuments());
db.users.find().forEach(function(user) {
  print("- " + user.name);
});
print("");


print("Task 5: ADD NEW RATING USING $push\n");

print("Before adding rating:");
const bookForRating = db.books.findOne({ title: "Foundation" });
print("Book: " + bookForRating.title);
print("Current ratings count: " + bookForRating.ratings.length);

db.books.updateOne(
  { title: "Foundation" },
  { 
    $push: { 
      ratings: {
        user: "Emma Davis",
        score: 5,
        comment: "A visionary work of science fiction!"
      }
    }
  }
);

print("\nAfter adding rating:");
const bookWithNewRating = db.books.findOne({ title: "Foundation" });
print("Book: " + bookWithNewRating.title);
print("Updated ratings count: " + bookWithNewRating.ratings.length);
print("\nAll ratings for Foundation:");
printjson(bookWithNewRating.ratings);

print("\nCRUD OPERATIONS COMPLETE\n");
