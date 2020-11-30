import './SideBarItem.css';

const SideBarItem = ({text, numEmails, clickHandler}) => {
    return <div className="sideBarItem" onClick={() => clickHandler()}><p>{text}</p><p>{numEmails}</p></div>;
}

export default SideBarItem;