import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const Dummuy_Meetups = [
//   {
//     id: "m1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     title: "A First Meetup",
//     address: "Some address 5, 12345",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     title: "A Second Meetup",
//     address: "Some address 6, 67890",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://EunSu:PUbr5mftJ2cO3vw6@cluster0.wqzl0ym.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
