import React, { useState, useRef } from 'react';
import './EmailTab.css'
import { GoReply } from 'react-icons/go';
import { GoMailRead } from 'react-icons/go';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { RiMailLine } from 'react-icons/ri';
import { IoArchiveOutline } from 'react-icons/io5';

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

    return <div onMouseOver={() => changeIconsContainerDisplay(true)}
        onMouseOut={() => changeIconsContainerDisplay(false)}
        className="emailTabContainer" style={inlineStyles}>
        <input className="emailTabCheckbox" onClick={() => checkboxClickHandler()} type="checkbox" />
        <div style={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <span style={{ display: "flex", alignItems: "center", overflow: "hidden", maxWidth: "100%" }} onClick={() => textClickHandler()} >
                <p className="emailTabName">{emailData.senderName}</p>
                <p className="emailTabSnippet">{emailData.subject}</p> -
                <p className="emailTabDescription"><em>{emailData.description}</em></p>
            </span>
            <div ref={iconsContainer} style={{ display: 'none' }} className="emailTabIconsContainer">
                <GoReply onClick={() => replyHandler()} className="emailTabIcon" />
                <IoArchiveOutline onClick={() => archiveHandler(emailData.id)} className="emailTabIcon" />
                <RiDeleteBin5Line onClick={() => deleteEmailHandler(emailData.id)} className="emailTabIcon" />
                {emailData.isRead
                    ? <RiMailLine onClick={() => markAsReadHandler(emailData.id, type)} className="emailTabIcon" />
                    : <GoMailRead onClick={() => markAsReadHandler(emailData.id, type)} className="emailTabIcon" />}
            </div>
        </div>
    </div>;
}

export default EmailTab;