import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://EunSu:PUbr5mftJ2cO3vw6@cluster0.wqzl0ym.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db("meetups"); //meetups는 데이터베이스이름

    const meetupsCollection = db.collection("meetups"); //컬렉션이름 meetups, 데이터베이스와 이름이 같아도 상관없음

    // insertOne을 통해 컬렉션에 새문서 삽입
    // 데이터베이스에 전체 data객체를 입력했으므로 구조분해 방식을 사용할 필요가 없음
    const result = await meetupsCollection.insertOne({ data });

    console.log(result);

    client.close();

    // response객체를 이용해서 응답을 전송해주어야함!
    // => 요청을 받아들이고 데이터베이스에 데이터를 저장하는데 최종적으로는 응답을 전송하는 일도 필요함!
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
