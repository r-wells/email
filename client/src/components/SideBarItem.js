import './SideBarItem.css';

const SideBarItem = ({ text, type, numEmails, clickHandler }) => {
    return <div className="sideBarItem" onClick={() => clickHandler(type)}><p>{text}</p><p>{numEmails}</p></div>;
}

export default SideBarItem;