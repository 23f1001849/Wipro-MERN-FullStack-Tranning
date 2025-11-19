const { MongoClient } = require('mongodb');

const ATLAS_URI = process.env.MONGODB_ATLAS_URI || 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/';

const DB_NAME = 'BookVerseCloudDB';

async function connectToAtlas() {
  console.log('\nMONGODB ATLAS CONNECTION TEST\n');
  
  // Create MongoDB client
  const client = new MongoClient(ATLAS_URI);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log(' Connected successfully to MongoDB Atlas!\n');

    const db = client.db(DB_NAME);
    console.log(`Using database: ${DB_NAME}\n`);

    console.log(' TEST 1: List Collections ');
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections:`);
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    console.log('');
    

    console.log(' TEST 2: Document Counts ');
    
    const authorsCount = await db.collection('authors').countDocuments();
    console.log(`Authors: ${authorsCount} documents`);
    
    const booksCount = await db.collection('books').countDocuments();
    console.log(`Books: ${booksCount} documents`);
    
    const usersCount = await db.collection('users').countDocuments();
    console.log(`Users: ${usersCount} documents`);
    console.log('');

    console.log(' TEST 3: Sample Query - Authors ');
    const authors = await db.collection('authors').find({}).toArray();
    console.log(`Retrieved ${authors.length} authors:`);
    authors.forEach(author => {
      console.log(`  - ${author.name} (${author.nationality}, b. ${author.birthYear})`);
    });
    console.log('');

    console.log(' TEST 4: Sample Query - Fantasy Books ');
    const fantasyBooks = await db.collection('books')
      .find({ genre: 'Fantasy' })
      .project({ title: 1, publicationYear: 1, _id: 0 })
      .toArray();
    
    console.log(`Found ${fantasyBooks.length} Fantasy books:`);
    fantasyBooks.forEach(book => {
      console.log(`  - ${book.title} (${book.publicationYear})`);
    });
    console.log('');
    

    console.log(' TEST 5: Aggregation - Average Ratings ');
    const avgRatings = await db.collection('books').aggregate([
      { $unwind: '$ratings' },
      {
        $group: {
          _id: '$title',
          avgRating: { $avg: '$ratings.score' },
          numRatings: { $sum: 1 }
        }
      },
      { $sort: { avgRating: -1 } },
      { $limit: 3 }
    ]).toArray();
    
    console.log('Top 3 highest-rated books:');
    avgRatings.forEach((book, index) => {
      console.log(`  ${index + 1}. ${book._id}`);
      console.log(`     Average Rating: ${book.avgRating.toFixed(2)}/5.0`);
      console.log(`     Number of Ratings: ${book.numRatings}`);
    });
    console.log('');

    console.log(' TEST 6: Insert Operation Test ');
    const testUser = {
      name: 'Test User',
      email: 'test.user@atlas.example.com',
      joinDate: new Date()
    };
    
    const insertResult = await db.collection('users').insertOne(testUser);
    console.log(` Test user inserted with ID: ${insertResult.insertedId}`);

    await db.collection('users').deleteOne({ _id: insertResult.insertedId });
    console.log(' Test user cleaned up');
    console.log('');
    

    console.log(' CONNECTION INFO ');
    const adminDb = client.db('admin');
    const serverStatus = await adminDb.command({ serverStatus: 1 });
    console.log(`MongoDB Version: ${serverStatus.version}`);
    console.log(`Host: ${serverStatus.host}`);
    console.log(`Uptime: ${Math.floor(serverStatus.uptime / 3600)} hours`);
    console.log('');
    
    console.log(' ALL TESTS COMPLETED SUCCESSFULLY \n');
    console.log('Your MongoDB Atlas connection is working correctly!');
    console.log('You can now use this database for your application.\n');
    
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:');
    console.error(error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Check your connection string is correct');
    console.error('2. Ensure your password is properly URL-encoded');
    console.error('3. Verify your IP address is whitelisted in Atlas Network Access');
    console.error('4. Confirm your database user has proper permissions');
    console.error('5. Check if your cluster is running');
  } finally {
    await client.close();
    console.log('\nConnection closed.');
  }
}

if (ATLAS_URI.includes('<username>') || ATLAS_URI.includes('<password>')) {
  console.error('\n ERROR: Please update the ATLAS_URI with your actual MongoDB Atlas connection string\n');
  console.log('You can either:');
  console.log('1. Set the MONGODB_ATLAS_URI environment variable:');
  console.log('   export MONGODB_ATLAS_URI="mongodb+srv://username:password@cluster.mongodb.net/"');
  console.log('   node atlas-connection.js\n');
  console.log('2. Or edit this file and replace the ATLAS_URI constant with your connection string\n');
  process.exit(1);
}


connectToAtlas().catch(console.error);


module.exports = { connectToAtlas, ATLAS_URI, DB_NAME };
