import './SideBar.css'
import SideBarItem from './SideBarItem';

const SideBar = ({sendEmailClickHandler}) => {
    const redirectHandler = () => {
        window.location.href = '/';
    }

    return <ul className="sideBar">
        <button onClick={() => sendEmailClickHandler()} className="sideBarButton">New Email</button>
        <SideBarItem clickHandler={redirectHandler} text="Inbox" numEmails={16} />
        <SideBarItem clickHandler={redirectHandler} text="Spam" />
        <SideBarItem clickHandler={redirectHandler} text="Trash" />
        <SideBarItem clickHandler={redirectHandler} text="Archives" />
        <SideBarItem clickHandler={redirectHandler} text="Category 1" />
        <SideBarItem clickHandler={redirectHandler} text="Category 2" />
        <SideBarItem clickHandler={redirectHandler} text="Category 3" />
        <SideBarItem clickHandler={redirectHandler} text="Category 4" />
        <SideBarItem clickHandler={redirectHandler} text="Category 5" />
    </ul>;
}
 
export default SideBar;