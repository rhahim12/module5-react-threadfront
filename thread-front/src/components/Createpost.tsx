import "./Createpost.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Create() {
    const [text, setText] = useState("")

    let navigate = useNavigate();

    function start(event: any): void {
        event.preventDefault();

        const FormData_obj = new FormData(event.target)
        const text = FormData_obj.get("text")?.toString();
        if (text == undefined) {
            return;
        }


        console.log(text)
        setText(text)




        navigate("/feed")



    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify({
            title: "",
            content: text,
        }),
    })
        .then((response) => {
            if (response.ok == false) {
                throw response.status;
            } else {
                response.json()
            }
        })
        .then((result) => {

            console.log(result)


        }).catch(console.log)



    return (
        <div className="creat">
            <h1 className="hache">New post</h1>
            <form onSubmit={start}>
                <textarea className="text" name="text" placeholder="Tapez votre post ici ..." />
                <button>Poster !</button>
            </form>





        </div>
    )
}