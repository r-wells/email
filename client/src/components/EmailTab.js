import React, { useState, useRef } from 'react';
import './EmailTab.css'
import deleteicon from '../images/deleteicon.png';
import archiveicon from '../images/archiveicon.jpg';
import reply from '../images/reply.png';
import notreadmail from '../images/notreadmail.png';
import markasread from '../images/markasread.png';

const EmailTab = ({ emailData, emailClickHandler, markAsReadHandler, deleteEmailHandler, archiveHandler, replyHandler, type }) => {
    const [isSelected, setIsSelected] = useState(false);
    const iconsContainer = useRef(null);

    const checkboxClickHandler = () => {
        setIsSelected(!isSelected);
    }

    const textClickHandler = () => {
        emailClickHandler(emailData.id, type);
    }

    const changeIconsContainerDisplay = (enter) => {
        if (enter) {
            iconsContainer.current.style.display = 'flex';
        } else {
            iconsContainer.current.style.display = 'none';
        }
    }

    const inlineStyles = emailData.isRead ? {} : { backgroundColor: "#ffffff" };

    return <div onMouseOver={() => changeIconsContainerDisplay(true)} onMouseOut={() => changeIconsContainerDisplay(false)} className="emailTabContainer" style={inlineStyles}>
        <input className="emailTabCheckbox" onClick={() => checkboxClickHandler()} type="checkbox" />
        <div className="emailTabTextContainer">
            <div style={{ display: "flex", alignItems: "center" }} onClick={() => textClickHandler()} >
                <p className="emailTabSubject">{emailData.senderName}</p>
                <p className="emailTabSnippet">{emailData.subject}</p>
            </div>
            <div ref={iconsContainer} style={{ display: 'none' }} className="emailTabIconsContainer">
                <img onClick={() => replyHandler()} className="emailTabIcon" src={reply} />
                <img onClick={() => archiveHandler(emailData.id)} className="emailTabIcon" src={archiveicon} />
                <img onClick={() => deleteEmailHandler(emailData.id)} className="emailTabIcon" src={deleteicon} />
                {emailData.isRead
                    ? <img onClick={() => markAsReadHandler(emailData.id, type)} className="emailTabIcon" src={markasread} />
                    : <img onClick={() => markAsReadHandler(emailData.id, type)} className="emailTabIcon" src={notreadmail} />}
            </div>
        </div>
    </div>;
}

export default EmailTab;