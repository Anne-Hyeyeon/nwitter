import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDeleteClick = async () => {
        const ok =  window.confirm("정말로 이 글을 지우겠습니까?")
        console.log(ok)
        if (ok){
            // delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete()
        }
    }
    const toggleEditing = () => setEditing((prev) => !(prev))
    const onSubmit = async (event) =>{
        event.preventDefault()
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }
    const onChange = (event) => {
        const { target:{ value } } = event
        setNewNweet(value)
    }
    return (
        <div>
            {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    {/* // react의 input과 onchage는 세트다. onchange는 또 submit과도 세트다. */}
                    <input type='text' onChange={onChange} placeholder="글을 수정하세요" value={newNweet} required />
                    <input type='submit' value='Update' />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
            ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {attatchmentUrl && <img src={attachmentUrl} width='200' height='200' }
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </>
            )}
            </>
            )
            }

        </div>
    )
}
export default Nweet