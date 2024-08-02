
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { meetupId } = params;

  try {
    const client = await MongoClient.connect('mongodb+srv://samim:9GTVxz9WmfwpvgT1@cluster0.uvriynl.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    const db = client.db();
    const meetupCollection = db.collection('meetups');
    console.log('Connected to collection: meetups');

    const meetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });
    console.log('Fetched meetup:', meetup);

    client.close();
    console.log('Closed MongoDB connection');

    if (!meetup) {
      return new Response(JSON.stringify({ message: 'Meetup not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(meetup), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching meetup:', error);
    return new Response(JSON.stringify({ message: 'Error fetching meetup', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
