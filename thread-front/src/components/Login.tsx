import "./Login.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Login() {
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    let navigate = useNavigate();

    function start(event: any): void {
        event.preventDefault();
        const FormData_obj = new FormData(event.target)
        const email = FormData_obj.get("email")?.toString();
        if (email == undefined) {
            return;
        }
        const password = FormData_obj.get("password")?.toString();
        if (password == undefined) {
            return;
        }

        setMail(email)
        setPass(password)
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: myHeaders,
        credentials: "include",
        body: JSON.stringify({
            email: mail,
            password: pass
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
            navigate("/feed")
            localStorage.setItem("prénom", "Rhahim")

        }).catch(console.log)

    return (
        <div className="test">
            <h1>Connexion</h1>
            <form onSubmit={start}>
                <input type="text" name="email" className="email" placeholder="email" />
                <input type="password" name="password" className="password" placeholder="password" />
                <button>Se connecter</button>
            </form>
            <p className="create-account-link"><Link to="/register" className="link">Se créer un compte.</Link></p>
        </div>
    )
}