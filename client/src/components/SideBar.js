import './SideBar.css';
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
    </ul>;
}

export default SideBar;