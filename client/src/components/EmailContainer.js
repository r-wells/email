import React, {useState} from 'react';
import EmailTab from './EmailTab';
import NewEmail from './NewEmail';
import './EmailContainer.css';

const EmailContainer = ({emails, emailClickHandler, markAsReadHandler, sendEmailHandler, sendEmail}) => {
    return <div className="emailContainer">
        {emails.map(email => {
            return <EmailTab markAsReadHandler={markAsReadHandler} 
                emailClickHandler={emailClickHandler} 
                name={email.senderName} key={email.id} 
                subject={email.subject} isRead={email.isRead} 
                id={email.id}/>;
        })}
        {sendEmail && <NewEmail closeHandler={sendEmailHandler} sendEmailHandler={sendEmailHandler} />}
    </div>;
}
 
export default EmailContainer;