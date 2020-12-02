import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NewEmail from './NewEmail';
import './Email.css';
import './EmailTab.css';
import { GoReply } from 'react-icons/go';
import { GoMailRead } from 'react-icons/go';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { RiSpam2Line } from 'react-icons/ri';
import { RiMailLine } from 'react-icons/ri';
import { IoArchiveOutline } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

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

    const readIcon = email && isRead ? <GoMailRead onClick={() => clickHandler()} className="emailTabIcon" /> : <RiMailLine onClick={() => clickHandler()} className="emailTabIcon" />;

    if (email) {
        return <div className="emailWrapper">
            <div id="emailHeader">
                <BiArrowBack onClick={() => window.location.href = '/'} className="emailTabIcon" />
                <RiDeleteBin5Line onClick={() => deleteEmailHandler(emailId)} className="emailTabIcon" />
                <IoArchiveOutline onClick={() => archiveHandler(emailId)} className="emailTabIcon" />
                <RiSpam2Line onClick={() => markAsSpamHandler(email.id)} className="emailTabIcon" />
                {readIcon}
            </div>
            <div id="emailBodyHeader">
                <h2>
                    {email.subject}
                </h2>
            </div>
            <div className="emailBodyWrapper">
                <div className="emailHeaderTitle" id="emailHeaderTitle">
                    <BsFillPersonFill className="emailTabIcon" style={{ height: "40px", width: "40px" }} />
                    <h4>{email.senderName}</h4>
                    <p>{email.senderEmail}</p>
                    <GoReply onClick={() => replyHandler()} style={{ marginLeft: "10px" }} className="emailTabIcon" />
                </div>
                <div className="emailBody" id="emailBody">{email.description}</div>
                <button onClick={() => replyHandler()} className="emailReplyButton"><GoReply style={{ height: "20px", width: "20px", marginRight: "10px" }} />Reply</button>
            </div>
            {sendEmail && <NewEmail closeHandler={sendEmailHandler} />}
        </div>;
    } else {
        return <h2>Loading...</h2>;
    }
}

export default Email;