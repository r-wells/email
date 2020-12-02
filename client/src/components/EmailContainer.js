import React, { useState } from 'react';
import EmailTab from './EmailTab';
import NewEmail from './NewEmail';
import './EmailContainer.css';

const EmailContainer = ({ emails, emailClickHandler, markAsReadHandler, sendEmailHandler, sendEmail, deleteEmailHandler, archiveHandler, sendEmailData, replyHandler, type }) => {
    console.log('emails', emails);
    return <div className="emailContainer">
        {emails.map(email => {
            return <EmailTab markAsReadHandler={markAsReadHandler}
                emailClickHandler={emailClickHandler}
                name={email.senderName} key={email.id}
                subject={email.subject} isRead={email.isRead}
                id={email.id}
                deleteEmailHandler={deleteEmailHandler}
                archiveHandler={archiveHandler} emailData={email}
                replyHandler={replyHandler}
                type={type} />;
        })}
        {sendEmail && <NewEmail sendEmailData={sendEmailData} closeHandler={sendEmailHandler} />}
    </div>;
}

export default EmailContainer;