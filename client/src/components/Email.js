import React, {useState, useEffect} from 'react';
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

const Email = ({ markAsReadHandler, sendEmail, sendEmailHandler }) => {
    const [emailData, setEmailData] = useState();
    const {emailId} = useParams();
    useEffect(() => {
        if(!emailData) {
            fetch(`http://localhost:9000/emails/${emailId}`, {
                method: "GET"
            }).then(res => res.json()).then(data => setEmailData(data.requestedEmail[0]));
        }
    }, [emailId]);
    const clickHandler = () => {
        const oldEmailData = emailData;
        oldEmailData.isRead = !oldEmailData.isRead;
        setEmailData(oldEmailData);
        markAsReadHandler(emailData.id);
    }

    const readIcon = emailData && emailData.isRead ? markasread : notreadmail;

    if(emailData) {
        return <div className="emailWrapper">
            <div id="emailHeader">
                <img onClick={() => window.location.href = '/'} className="emailTabIcon" src={backarrow} />
                <img className="emailTabIcon" src={deleteicon} />
                <img className="emailTabIcon" src={archiveicon} />
                <img className="emailTabIcon" src={reportspam} />
                <img onClick={() => clickHandler()} className="emailTabIcon" src={readIcon} />
            </div>
            <div id="emailBodyHeader">
                <h2 style={{ fontWeight: "normal", margin: "0" }}>
                    {emailData.subject}
                </h2>
            </div>
            <div className="emailHeaderTitle" id="emailHeaderTitle">
                <img className="emailTabIcon" style={{ height: "40px", width: "40px" }} src={personicon} />
                <h4>{emailData.senderName}</h4>
                <p>{emailData.senderEmail}</p>
                <img style={{ marginLeft: "10px" }} className="emailTabIcon" src={reply} />
            </div>
            <div className="emailBody" id="emailBody">{emailData.description}</div>
            {sendEmail && <NewEmail closeHandler={sendEmailHandler} />}
        </div>;
    } else {
        return <h2>Loading...</h2>;
    }
}
 
export default Email;