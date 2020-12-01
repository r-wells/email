import './NewEmail.css';

const NewEmail = ({ closeHandler }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('to', event.target.querySelector('#to').value);
        console.log('from', event.target.querySelector('#from').value);
        fetch('http://localhost:9000/emails/send', {
            method: 'POST',
            body: JSON.stringify({
                from: event.target.querySelector('#from').value,
                to: event.target.querySelector('#to').value,
                subject: event.target.querySelector('#subject').value,
                message: event.target.querySelector('#message').value,
            }),
            headers: { 'Content-Type': 'application/json' },
        }).then(function (res) {
            res.json();
        })
            .catch(err => console.error(err.message));
        closeHandler();
    }

    return <div className="newEmailContainer">
        <div className="newEmailHeader">
            <p>Header</p>
            <p onClick={() => closeHandler()}>x</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} method="POST" className="newEmailSendData">
            <div style={{ display: 'flex', borderBottom: '1px solid #d3d3d3', padding: '10px' }}>
                <label htmlFor="to">To: </label>
                <input style={{ width: '100%', border: 'none', outlineWidth: "0", marginLeft: "5px" }} id="to" name="to" />
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #d3d3d3', padding: '10px' }}>
                <label htmlFor="from">From: </label>
                <input style={{ width: '100%', border: 'none', outlineWidth: "0", marginLeft: "5px" }} id="from" name="from" />
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #d3d3d3', padding: '10px' }}>
                <label htmlFor="subject">Subject: </label>
                <input style={{ width: '100%', border: 'none', outlineWidth: "0", marginLeft: "5px" }} id="subject" name="subject" />
            </div>
            <textarea name="message" id="message" className="newEmailTextArea" />
            <button type="submit" className="newEmailSendButton">Send</button>
        </form>
    </div>;
}

export default NewEmail;