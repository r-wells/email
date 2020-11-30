import emaillogo from '../images/emaillogo.png';
import usericon from '../images/usericon.png';
import './NavBar.css';

const NavBar = () => {
    const iconClickHandler = () => {
        window.location.href = '/';
    }

    return <div className="navBar">
        <img onClick={() => iconClickHandler()} className="navBarIcon" src={emaillogo} />
        <input className="searchBar" type="text" placeholder="Search.." />
        <img onClick={() => iconClickHandler()} className="navBarIcon" src={usericon} />
    </div>;
}
 
export default NavBar;