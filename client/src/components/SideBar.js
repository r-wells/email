import './SideBar.css';
import SideBarItem from './SideBarItem';

const SideBar = ({ sendEmailClickHandler, emails }) => {
    const redirectHandler = (type) => {
        if (type === 'inbox') {
            window.location.href = `/`
        } else {
            window.location.href = `/${type}`
        }
    }

    return <ul className="sideBar">
        <button onClick={() => sendEmailClickHandler()} className="sideBarButton">New Email</button>
        <SideBarItem numEmails={emails.inbox.length} clickHandler={redirectHandler} type="inbox" text="Inbox" />
        <SideBarItem numEmails={emails.spam.length} clickHandler={redirectHandler} type="spam" text="Spam" />
        <SideBarItem numEmails={emails.trash.length} clickHandler={redirectHandler} type="trash" text="Trash" />
        <SideBarItem numEmails={emails.archive.length} clickHandler={redirectHandler} type="archive" text="Archive" />
    </ul>;
}

export default SideBar;