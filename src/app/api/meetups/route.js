import { MongoClient } from 'mongodb';

export async function GET(req) {
  try {
    // Step 1: Connect to MongoDB
    const client = await MongoClient.connect('mongodb+srv://samim:9GTVxz9WmfwpvgT1@cluster0.uvriynl.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Step 2: Select the database and collection
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    console.log('Connected to collection: meetups');

    // Step 3: Fetch all meetups from the collection
    const meetups = await meetupCollection.find().toArray();
    console.log('Fetched meetups:', meetups);

    // Step 4: Close the MongoDB connection
    client.close();
    console.log('Closed MongoDB connection');

    // Step 5: Send the fetched meetups as a JSON response
    return new Response(JSON.stringify({ meetups }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Step 6: Handle any errors that occur
    console.error('Error fetching meetups:', error);
    return new Response(JSON.stringify({ message: 'Error fetching meetups', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
