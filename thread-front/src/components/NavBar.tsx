import './NavBar.css';


export function NavBar()
{
    return (
        <nav className='NavItem'>
            <li><a href="./NewPost.tsx"><i className="fa-solid fa-circle-plus"></i></a></li>
            <li><a href="./Profil.tsx"><i className="fa-solid fa-circle-user"></i></a></li>
            <li><a href="./Feed.tsx"><i className="fa-solid fa-message"></i></a></li>
        </nav>
    )
}