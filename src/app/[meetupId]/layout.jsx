
export async function generateMetadata({ params }) {
  const { meetupId } = params;

  // Use an absolute URL for the API request
  const response = await fetch(`http://localhost:3000/api/meetups/${meetupId}`); 
  if (!response.ok) {
    throw new Error('Failed to fetch meetup data');
  }

  const meetup = await response.json();

  return {
    title: meetup.title,
    description: meetup.description,
    openGraph: {
      title: meetup.title,
      description: meetup.description,
      images: [
        {
          url: meetup.image,
          alt: meetup.title,
        },
      ],
    },
  };
}




const MeetupDetailsLayout = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default MeetupDetailsLayout