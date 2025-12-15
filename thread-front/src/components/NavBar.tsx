import "./NavBar.css"

export function NavBar()
{
    return (
        <nav className='NavItem'>
            <li><a href="./Createpost"><i className="fa-solid fa-circle-plus"></i></a></li>
            <li><a href="./Profil"><i className="fa-solid fa-circle-user"></i></a></li>
            <li><a href="./Feed"><i className="fa-solid fa-message"></i></a></li>
            <li><a href="./Logout"><i className="fa-solid fa-right-to-bracket"></i></a></li>
        </nav>
    )
}