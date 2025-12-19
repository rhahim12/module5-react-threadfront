import Post from "./Post.tsx"
import { NavBar } from "./NavBar.tsx"
import "./Feed.css"
import { PostData } from "../types/PostData.interface.tsx"
import { useEffect, useState } from "react"

export default function Feed() {

    const [datas, setDatas] = useState<Array<PostData>>([])
    const [offset, setOffset] = useState(1)
    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const url = "http://localhost:3000/posts"
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const result: Array<PostData> = await response.json();
                setDatas(result);
            } catch (error) {
                console.log(error)
            }
        };

        fetchPosts()
    }, []);

    console.log(datas)

    const listPosts = datas.sort((a, b)=>{
        return new Date(a.updatedAt).getTime() + new Date(b.updatedAt).getTime()
    });

    function FeedScroll(event: any) 
    { 
        useEffect(()=>{

            const fetchlimit = async () => {
                try{
                        const url = "http://localhost:3000/posts/10/1"
                        const response = await fetch(url, {
                        method: "GET",
                        credentials: "include"
                    });
            
                    if (!response.ok)
                    {
                        throw new Error(`Erreur ${response.status}`);
                        }
                    const result: Array<PostData> = await response.json();
                    if (result == null)
                    {
                        console.log("end of the line")
                    }
                    setOffset(prev=> prev + 1)
                    setDatas(result)
                }catch(error){
                    console.log(error)
                }
            };
            fetchlimit()
            
        },[offset])
    }

    return (
        <>
            <div className="feed">
                <h1 className="feed-title">Feed</h1>
                <div className="feed-post-box" onScroll={()=>setOffset(prev=> prev+1)}>
                    {
                        listPosts.map((data, i) => {
                            return <Post postData={data} key={i} />
                        })
                    }

                </div>
                <NavBar />
            </div>
        </>

    )

}