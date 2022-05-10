import React, { useEffect, useState } from 'react';
import { dbService } from "fbase";


function Home({ userObj }) {
  const [nweet, setNweet] = useState("")
  const [nweets, setNweets] = useState([])
  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get()
    // console.log(dbNweets)
    dbNweets.forEach(document => {
      setNweets((prev)=>[document.data(), ...prev])
      const nweetObject = {
        ...document.data(),
        id: document.id
      }
    })
  }
  //useEffects는 데이터가 변했을 때 알아차리고 함수를 실행시키는 것.
  useEffect(()=>{
    // getNweets()
    dbService.collection('nweets').onSnapshot(snapshot=>{
      console.log('something happened')
      const nweetArray = snapshot.docs.map((doc=>({
        id: doc.id,
        ...doc.data()
      })))
      setNweets(nweetArray)
    })
  },[])
  const onSubmit = async (event) => {
    event.preventDefault()
    //preventDefault 는 onSubmit의 기본 기능(내용을 날리는 새로고침)을 막는다.
    await dbService.collection('nweets').add({
      nweet, //es문법에서는 nweet:nweet를 nweet만 적어줘도 된다.
      createdAt: Date.now(),
      creatorId: userObj.uid
    })
    setNweet("")
  }
  const onChange = (event) => {
    const{ target:{value} } = event
    setNweet(value)
  }
  console.log(nweets)
    return (
        <div>
          <form onSubmit={onSubmit}>
            <input type='text' value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
            <input type='submit' value='Nweet' />
          </form>
          <div>
            {nweets.map((nweet)=>(
              <div key={nweet.id}>
                <h4>{nweet.nweet}</h4>
              </div>
            ))}
          </div>
        </div>
    )
}

export default Home;