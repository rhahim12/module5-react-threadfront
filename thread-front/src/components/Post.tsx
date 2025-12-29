import { useState } from "react";
import './Post.css'
import {PostData} from "../types/PostData.interface.tsx"
import { useNavigate } from "react-router-dom";

export default function Post({postData}: {postData : PostData}){


    let navigate = useNavigate();

    const postDate = new Date(postData.updatedAt).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    function onClickPost(postData : PostData){
        const postId = postData.id
        navigate("/post-detail/"+postId)
    }


    return(
        <div className="post" onClick={()=>{onClickPost(postData)}}>
            <h2 className="post-username">@{postData.User.username}</h2>
            <p className="post-content">{postData.content}</p>
            <p className="post-date-infos">{postDate}</p>
        </div>
    )
}