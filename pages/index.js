import MeetupList from "../components/meetups/MeetupList";

const Dummuy_Meetups = [
  {
    id: "m1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    title: "A First Meetup",
    address: "Some address 5, 12345",
  },
  {
    id: "m2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    title: "A Second Meetup",
    address: "Some address 5, 12345",
  },
];

function HomePage() {
  return (
    <>
      <MeetupList meetups={Dummuy_Meetups} />
    </>
  );
}

export default HomePage;
