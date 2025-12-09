import { useState } from "react";

export function Post({postId}: {postId : number}){

    const [id, setId] = useState(0)

    setId(postId);
    let postData: Array<any> = [];

    async function getPost(){

        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`);

            let postData = await response.json();

            return postData

        } catch (error : any) {
            console.error(error.message)
        }

        return postData
    }


    return(
        <div className="post">
            <h1>@{postData.pseudo}</h1>
            <p>{postData.content}</p>
            <p className="post-date-infos">{postData.createdAt}</p>
        </div>
    )
}