import './NewEmail.css';

const NewEmail = ({closeHandler, sendEmailHandler}) => {
    return <div className="newEmailContainer">
        <div className="newEmailHeader">
            <p>Header</p>
            <p onClick={() => closeHandler()}>x</p>
        </div>
        <form className="newEmailSendData">
            <div style={{ display: 'flex', borderBottom: '1px solid #d3d3d3', padding: '10px' }}>
                <label for="to">To: </label>
                <input style={{ width: '100%', border: 'none', outlineWidth: "0", marginLeft: "5px" }} id="to" name="to" />
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #d3d3d3', padding: '10px' }}>
                <label for="From">From: </label>
                <input style={{ width: '100%', border: 'none', outlineWidth: "0", marginLeft: "5px" }} id="from" name="from" />
            </div>
            <textarea name="message" id="message" className="newEmailTextArea" />
            <button onClick={() => sendEmailHandler()} type="submit" className="newEmailSendButton">Send</button>
        </form>
    </div>;
}
 
export default NewEmail;