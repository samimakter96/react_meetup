'use client';

import { useEffect, useState } from 'react';
import MeetupList from '@/components/meetups/MeetupList';

function HomePage() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        // Step 1: Send a GET request to the API
        const response = await fetch('/api/meetups');
        
        // Step 2: Check if the response is OK
        if (!response.ok) {
          throw new Error('Failed to fetch meetups.');
        }

        // Step 3: Parse the response data
        const data = await response.json();
        
        // Step 4: Update the state with the fetched meetups
        setLoadedMeetups(data.meetups);
      } catch (error) {
        // Step 5: Handle any errors
        console.error('Error fetching meetups:', error);
      }
    };

    // Call the fetchMeetups function when the component mounts
    fetchMeetups();
  }, []);

  // Render the MeetupList component with the fetched meetups
  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
