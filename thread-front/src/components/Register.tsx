import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Register() {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")
    const [user, setUser] = useState("")
    const [word, setWord] = useState("")


    let navigate = useNavigate();


    function start(event: any): void {
        event.preventDefault();

        const FormData_obj = new FormData(event.target)
        const email = FormData_obj.get("email")?.toString();
        if (email == undefined) {
            return;
        }
        const password = FormData_obj.get("pass")?.toString();
        if (password == undefined) {
            return;
        }
         const user = FormData_obj.get("use")?.toString();
        if (user == undefined) {
            return;
        }
         const word = FormData_obj.get("word")?.toString();
        if (word == undefined) {
            return;
        }


                console.log(user)
        console.log(email)
        console.log(password)
        console.log(word)
        setUser(user)
        setMail(email)
        setPass(password)
        setWord(word)





    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify({
            username: user,
            email: mail,
            password: pass,
            passwordConfirmation: word,

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
            navigate("/login")


        }).catch(console.log)






    return (
        <div className="all">
            <h1>Creation de compte </h1>
            <form onSubmit={start}>
                <input type="text" className="pseudo" name="use" placeholder="@Pseudo" />
                <input type="text" className="email" name="email" placeholder="email" />
                <input type="text" className="mot" name="pass" placeholder="mot de passe" />
                <input type="text" className="pass" name="word" placeholder="mot de passe encore" />
                <button>Créer un compte</button>
            </form>
        </div>
    )

}