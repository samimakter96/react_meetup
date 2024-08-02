'use client';

import { useEffect, useState } from 'react';
import MeetupDetail from '@/components/meetups/MeetupDetail';

const MeetupDetails = ({ params }) => {
  const { meetupId } = params;
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    if (!meetupId) return;

    const fetchMeetup = async () => {
      try {
        const response = await fetch(`/api/meetups/${meetupId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meetup details.');
        }

        const data = await response.json();
        setMeetup(data);
      } catch (error) {
        console.error('Error fetching meetup:', error);
      }
    };

    fetchMeetup();
  }, [meetupId]);

  if (!meetup) {
    return <p>Loading...</p>;
  }

  return (
    <MeetupDetail
      image={meetup.image}
      title={meetup.title}
      address={meetup.address}
      description={meetup.description}
    />
  );
};

export default MeetupDetails;
