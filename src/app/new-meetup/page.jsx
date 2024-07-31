'use client';

import { useRouter } from 'next/navigation';

import NewMeetupForm from '@/components/meetups/NewMeetupForm';

const NewMeetupPage = () => {

  const router = useRouter();

  // Function to handle form submission
  const addMeetupHandler = async (enteredMeetupData) => {
    try {
      // Step 1: Send a POST request to the API route
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Step 2: Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      // Step 3: Parse the response data
      const data = await response.json();
      console.log('Meetup added:', data);

      // Step 4: Redirect to the meetups page
      router.push('/');
      
    } catch (error) {
      // Step 5: Handle any errors
      console.error('Error adding meetup:', error);
    }
  };

  // Render the form component
  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  );
};

export default NewMeetupPage;
