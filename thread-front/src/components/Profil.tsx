import { useEffect, useState } from "react";
import Post from "./Post";
import "./Profil.css"
import { PostData } from "../types/PostData.interface";
import { ProfilData } from "../types/ProfilData.interface";
import { NavBar } from "./NavBar";

export default function Profil() {
    const [postdatas, postSetDatas] = useState<Array<PostData>>([])
    const [profildatas, profilSetDatas] = useState<ProfilData | null>(null)

    useEffect(() => {

        const fetchPost = async () => {
            try {
                const url = "http://localhost:3000/user/posts/"
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const result: Array<PostData> = await response.json();
                console.log(result)
                postSetDatas(result);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchProfil = async () => {
            try {

                const url = "http://localhost:3000/user"
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const result: ProfilData = await response.json();
                profilSetDatas(result[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();
        fetchProfil();

    }, []
    );

    const profilelistPost = postdatas.sort((a, b)=>{
        return new Date(b.updatedAt).getTime() -new Date(a.updatedAt).getTime()
    })

    return (
        <div className="Profil">
            <div className="profil-head">
                <h1 className="Profil-title">Profile</h1>
                <h2 className="Profil-username">@{profildatas?.username}</h2>
            </div>

            <div className="profil-allpost">
                {profilelistPost.map((postData, i)=>{
                    return <Post postData={postData} key={i} />
                })}
            </div>
            <NavBar />
        </div>
    )

}