import { useNavigate } from "react-router-dom";
export default function Lougout() {

let navigate = useNavigate();
   



         const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: myHeaders,
        credentials: "include",
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
            localStorage.removeItem("prénom")


        }).catch(console.log)

        
    
    return(
        <div>
            <h1>Logout</h1>
           
        </div>
    )

}