import { useState } from "react";
import './Post.css'

export function Post({postData}: {postData : Array<String>}){

    // {postData}: {postData : Array<String>}

    // let data: Array<String> = [];

    // data = postData;

    return(
        <div className="post">
            <h2 className="post-username">@Ryu-du57</h2>
            <p className="post-content">Aujourd'hui je vais donner du contenu inutile et très peu intéressant. Signé Rhahim.</p>
            <p className="post-date-infos">15:25 13 août 1987</p>
        </div>
    )
}