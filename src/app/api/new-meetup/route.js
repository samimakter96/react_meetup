import { MongoClient } from 'mongodb';

export async function POST(req) {
  try {
    // Step 1: Parse the incoming request data
    const data = await req.json();
    console.log('Received data:', data);

    // Step 2: Validate the received data
    if (!data) {
      console.error('No data provided');
      return new Response(JSON.stringify({ message: 'No data provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Step 3: Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    // Step 4: Select the database and collection
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    console.log('Connected to collection: meetups');

    // Step 5: Insert the data into the collection
    const result = await meetupCollection.insertOne(data);
    console.log('Insert result:', result);

    // Step 6: Close the MongoDB connection
    client.close();
    console.log('Closed MongoDB connection');

    // Step 7: Send a success response
    return new Response(JSON.stringify({ message: 'Meetup Inserted' }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Step 8: Handle any errors
    console.error('Error inserting meetup:', error);
    return new Response(JSON.stringify({ message: 'Error inserting meetup', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
