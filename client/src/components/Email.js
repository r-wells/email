import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NewEmail from './NewEmail';
import './Email.css';
import './EmailTab.css';
import backarrow from '../images/back-button.jpg';
import deleteicon from '../images/deleteicon.png';
import reportspam from '../images/report-as-spam.png';
import personicon from '../images/personicon.png';
import archiveicon from '../images/archiveicon.jpg';
import reply from '../images/reply.png';
import notreadmail from '../images/notreadmail.png';
import markasread from '../images/markasread.png';

const Email = ({ markAsReadHandler, sendEmail, sendEmailHandler, deleteEmailHandler, archiveHandler, markAsSpamHandler, replyHandler, emails, type }) => {
    const { emailId } = useParams();
    let email = null;
    emails.forEach(e => {
        if (e.id === Number(emailId)) {
            email = e;
        }
    });
    const [isRead, setIsRead] = useState();
    const clickHandler = () => {
        setIsRead(!isRead);
        markAsReadHandler(email.id, type);
    }

    const readIcon = email && isRead ? markasread : notreadmail;

    if (email) {
        return <div className="emailWrapper">
            <div id="emailHeader">
                <img onClick={() => window.location.href = '/'} className="emailTabIcon" src={backarrow} />
                <img onClick={() => deleteEmailHandler(emailId)} className="emailTabIcon" src={deleteicon} />
                <img onClick={() => archiveHandler(email.id)} className="emailTabIcon" src={archiveicon} />
                <img onClick={() => markAsSpamHandler(email.id)} className="emailTabIcon" src={reportspam} />
                <img onClick={() => clickHandler()} className="emailTabIcon" src={readIcon} />
            </div>
            <div id="emailBodyHeader">
                <h2 style={{ fontWeight: "normal", margin: "0" }}>
                    {email.subject}
                </h2>
            </div>
            <div className="emailHeaderTitle" id="emailHeaderTitle">
                <img className="emailTabIcon" style={{ height: "40px", width: "40px" }} src={personicon} />
                <h4>{email.senderName}</h4>
                <p>{email.senderEmail}</p>
                <img onClick={() => replyHandler()} style={{ marginLeft: "10px" }} className="emailTabIcon" src={reply} />
            </div>
            <div className="emailBody" id="emailBody">{email.description}</div>
            {sendEmail && <NewEmail closeHandler={sendEmailHandler} />}
        </div>;
    } else {
        return <h2>Loading...</h2>;
    }
}

export default Email;