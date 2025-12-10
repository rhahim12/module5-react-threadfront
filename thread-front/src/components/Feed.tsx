import Post from "./Post.tsx"
import NavBar from "./NavBar.tsx"
import "./Feed.css"

export default function Feed() {


    let data: Array<any> = [];


    async function getData(){
        const url = "http://localhost:3000/posts"   
        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            data = result

            return data

        } catch (error: any) {
            console.error(error.message);
        }

        return
    }

    console.log(data)



    const fdata = [
        "title",
        "content"
    ]


    return (
        <div className="feed">
            <h1 className="feed-title">Feed</h1>
            <div className="feed-post-box">
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
                <Post postData={fdata} />
            </div>
            <NavBar />
        </div>

    )

}