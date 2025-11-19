
use BookVerseDB;

print("\nCREATING BOOKVERSE DATABASE\n");

db.authors.drop();
db.books.drop();
db.users.drop();

print("Collections cleared (if they existed)\n");


print("INSERTING AUTHORS\n");

db.authors.insertMany([
  {
    name: "J.K. Rowling",
    nationality: "British",
    birthYear: 1965
  },
  {
    name: "George R.R. Martin",
    nationality: "American",
    birthYear: 1948
  },
  {
    name: "Isaac Asimov",
    nationality: "American",
    birthYear: 1920
  },
  {
    name: "J.R.R. Tolkien",
    nationality: "British",
    birthYear: 1892
  }
]);

print("Authors inserted successfully!");
print("Total authors: " + db.authors.countDocuments() + "\n");

print("Inserted Authors:");
db.authors.find().forEach(printjson);

print("\nINSERTING USERS\n");

db.users.insertMany([
  {
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    joinDate: new Date("2023-06-15")
  },
  {
    name: "Bob Smith",
    email: "bob.smith@email.com",
    joinDate: new Date("2023-09-20")
  },
  {
    name: "Carol White",
    email: "carol.white@email.com",
    joinDate: new Date("2024-01-10")
  },
  {
    name: "David Brown",
    email: "david.brown@email.com",
    joinDate: new Date("2024-05-05")
  }
]);

print("Users inserted successfully!");
print("Total users: " + db.users.countDocuments() + "\n");

// Display inserted users
print("Inserted Users:");
db.users.find().forEach(printjson);

print("\nINSERTING BOOKS\n");

const jkRowling = db.authors.findOne({ name: "J.K. Rowling" });
const grrMartin = db.authors.findOne({ name: "George R.R. Martin" });
const asimov = db.authors.findOne({ name: "Isaac Asimov" });
const tolkien = db.authors.findOne({ name: "J.R.R. Tolkien" });


db.books.insertMany([
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
    authorId: jkRowling._id,
    ratings: [
      {
        user: "Alice Johnson",
        score: 5,
        comment: "Absolutely magical! A masterpiece."
      },
      {
        user: "Bob Smith",
        score: 5,
        comment: "Best fantasy book ever!"
      }
    ]
  },
  {
    title: "A Game of Thrones",
    genre: "Fantasy",
    publicationYear: 2016,
    authorId: grrMartin._id,
    ratings: [
      {
        user: "Carol White",
        score: 4,
        comment: "Great world-building and characters."
      },
      {
        user: "David Brown",
        score: 5,
        comment: "Epic fantasy at its best!"
      }
    ]
  },
  {
    title: "Foundation",
    genre: "Science Fiction",
    publicationYear: 1951,
    authorId: asimov._id,
    ratings: [
      {
        user: "Alice Johnson",
        score: 5,
        comment: "Revolutionary sci-fi concept."
      },
      {
        user: "Bob Smith",
        score: 4,
        comment: "Complex but rewarding read."
      }
    ]
  },
  {
    title: "I, Robot",
    genre: "Science Fiction",
    publicationYear: 1950,
    authorId: asimov._id,
    ratings: [
      {
        user: "Carol White",
        score: 4,
        comment: "Thought-provoking stories about AI."
      }
    ]
  },
  {
    title: "The Lord of the Rings",
    genre: "Fantasy",
    publicationYear: 1954,
    authorId: tolkien._id,
    ratings: [
      {
        user: "Alice Johnson",
        score: 5,
        comment: "The ultimate fantasy epic!"
      },
      {
        user: "Bob Smith",
        score: 5,
        comment: "Timeless classic."
      },
      {
        user: "David Brown",
        score: 5,
        comment: "A journey worth taking."
      }
    ]
  },
  {
    title: "The Hobbit",
    genre: "Fantasy",
    publicationYear: 1937,
    authorId: tolkien._id,
    ratings: [
      {
        user: "Carol White",
        score: 5,
        comment: "Perfect adventure story!"
      }
    ]
  }
]);

print("Books inserted successfully!");
print("Total books: " + db.books.countDocuments() + "\n");

print("Inserted Books:");
db.books.find().forEach(printjson);

print("\nDATA MODELING COMPLETE\n");
print("Summary:");
print("- Authors: " + db.authors.countDocuments());
print("- Books: " + db.books.countDocuments());
print("- Users: " + db.users.countDocuments());
print("\nData modeling demonstrates:");
print("- One-to-many relationship: Authors to Books (using authorId reference)");
print("- Embedded documents: Ratings within Books");
print("- Proper NoSQL schema design");
