import './PostDetail.css'
import Post from "./Post.tsx"
import { NavBar } from "./NavBar.tsx"
import { UserData } from "../types/UserData.interface.tsx"
import { PostData } from "../types/PostData.interface.tsx"
import { CommentsData } from "../types/CommentsData.interface.tsx"
import { useEffect, useState } from "react"
import { useParams } from "react-router"


export function PostDetail() {
    const [user, setUser] = useState<UserData>()
    const [post, setPost] = useState<PostData>();
    const [comments, setComments] = useState<Array<CommentsData>>([]);

    let params = useParams();

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const url = "http://localhost:3000/user";
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const result: UserData = await response.json();
                setUser(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();


        const fetchPost = async () => {
            try {
                if(!params.postId) {
                    throw new Error(`Erreur post indéfini`);
                }
                const url = "http://localhost:3000/post/" + params.postId;
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const result: PostData = await response.json();
                setPost(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();


        const fetchComments = async () => {
            try {
                if(!params.postId) {
                    throw new Error(`Erreur post indéfini`);
                }
                const url = "http://localhost:3000/post/" + params.postId + "/comments";
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }
                const results: Array<CommentsData> = await response.json();
                setComments(results);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComments();
    }, []);

    return(
        <div>

        </div>
    )
}

