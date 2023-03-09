import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://EunSu:PUbr5mftJ2cO3vw6@cluster0.wqzl0ym.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  //모든문서를 가져올수 있도록 첫번째 인수는 빈객체
  // 즉, 문서객체를 가져오되 각각은 ID만 포함하고 다른 필드는 포함하지X
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    // paths를 하드코딩하는대신 meetups로 ID가 있는 문서인 모든 meetup항목을 객체에 매칭할 수 있음
    // => 경로 배열을 동적으로 생성
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://EunSu:PUbr5mftJ2cO3vw6@cluster0.wqzl0ym.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  //findOne은 하나의 문서만 찾음
  //meetupId를 ObjectId로 감싸주면 문자열이 ObjectId객체로 변환
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
