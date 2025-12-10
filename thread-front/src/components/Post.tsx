import { useState } from "react";
import './Post.css'
import {PostData} from "../types/PostData.interface.tsx"

export default function Post({postData}: {postData : PostData}){

    const postDate = new Date(postData.updatedAt).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });


    return(
        <div className="post">
            <h2 className="post-username">@{postData.User.username}</h2>
            <p className="post-content">{postData.content}</p>
            <p className="post-date-infos">{postDate}</p>
        </div>
    )
}