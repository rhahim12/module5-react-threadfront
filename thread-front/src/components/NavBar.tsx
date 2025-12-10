import './NavBar.css';


export function NavBar()
{
    return (
        <nav className='NavItem'>
            <a href=""><li><i className="fa-solid fa-circle-plus"></i></li></a>
            <li><i className="fa-solid fa-user"></i></li> 
            <li><i className="fa-solid fa-message"></i></li>
        </nav>
    )
}