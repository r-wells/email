import React, { Component } from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import EmailContainer from './components/EmailContainer';
import Email from './components/Email';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  state = {
    emails: {
      inbox: [],
      trash: [],
      spam: [],
      archive: []
    },
    displaySendEmail: false,
  }

  async componentDidMount() {
    const localEmails = window.localStorage.getItem('appInboxEmails');
    if (localEmails !== null && localEmails !== undefined) {
      this.setState({
        emails: JSON.parse(localEmails)
      });
    }
    await fetch('http://localhost:9000/emails', {
      method: "GET"
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log('data', data);
      this.setState({ emails: data }, console.log(this.state.emails["inbox"]));
    }).catch((err) => {
      console.error(err.message);
    })
  }

  _emailRedirect = (id, type) => {
    window.location.href = `/email/${type}/${id}`;
  }

  _changeReadStatus = async (id, type) => {
    const oldStateEmails = { ...this.state.emails };
    oldStateEmails[type].forEach(email => {
      if (email.id === id) {
        email.isRead = !email.isRead
      }
    });
    this.setState({ emails: oldStateEmails });
    await fetch(`http://localhost:9000/emails/edit/${id}`, {
      method: "PUT",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).catch(err => console.error(err.message));
  }

  _showSendEmail = () => {
    this.setState(prevState => ({
      displaySendEmail: !prevState.displaySendEmail,

    }), () => console.log(this.state));
  }

  _deleteEmail = async (id) => {
    await fetch(`http://localhost:9000/emails/edit/${id}`, {
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).then(data => {
      console.log(data);
      window.location.href = '/';
    }).catch(err => console.error(err.message));
  }

  _markAsSpam = async (id) => {
    await fetch(`http://localhost:9000/emails/spam/${id}`, {
      method: "PUT",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(err => console.error(err.message));
  }

  _archiveEmail = async (id) => {
    await fetch(`http://localhost:9000/emails/archive/${id}`, {
      method: "PUT",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(err => console.error(err.message));
  }

  render() {
    const { displaySendEmail, emails } = this.state;
    return (
      <Router>
        <div>
          <NavBar />
          <div className="appContainer">
            <div className="wrapper">
              <SideBar sendEmailClickHandler={this._showSendEmail} emails={emails} />
              <div className="emailContainerWrapper">
                <Switch>
                  <Route exact path="/">
                    <EmailContainer archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail}
                      sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus}
                      emailClickHandler={this._emailRedirect} emails={emails.inbox} replyHandler={this._showSendEmail} type={"inbox"} />
                  </Route>
                  <Route path="/spam">
                    <EmailContainer archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail}
                      sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus}
                      emailClickHandler={this._emailRedirect} emails={emails.spam} replyHandler={this._showSendEmail} type={"spam"} />
                  </Route>
                  <Route path="/trash">
                    <EmailContainer archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail}
                      sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus}
                      emailClickHandler={this._emailRedirect} emails={emails.trash} replyHandler={this._showSendEmail} type={"trash"} />
                  </Route>
                  <Route path="/archive">
                    <EmailContainer archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail}
                      sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus}
                      emailClickHandler={this._emailRedirect} emails={emails.archive} replyHandler={this._showSendEmail} type={"archive"} />
                  </Route>
                  <Route path="/email/inbox/:emailId">
                    <Email markAsSpamHandler={this._markAsSpam}
                      type={"inbox"}
                      archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail} sendEmail={displaySendEmail}
                      sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus} emails={emails.inbox} replyHandler={this._showSendEmail} />
                  </Route>
                  <Route path="/email/spam/:emailId">
                    <Email markAsSpamHandler={this._markAsSpam}
                      type={"spam"}
                      archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail} sendEmail={displaySendEmail}
                      sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus} emails={emails.spam} replyHandler={this._showSendEmail} />
                  </Route>
                  <Route path="/email/trash/:emailId">
                    <Email markAsSpamHandler={this._markAsSpam}
                      type={"trash"}
                      archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail} sendEmail={displaySendEmail}
                      sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus} emails={emails.trash} replyHandler={this._showSendEmail} />
                  </Route>
                  <Route path="/email/archive/:emailId">
                    <Email markAsSpamHandler={this._markAsSpam}
                      type={"archive"}
                      archiveHandler={this._archiveEmail}
                      deleteEmailHandler={this._deleteEmail} sendEmail={displaySendEmail}
                      sendEmailHandler={this._showSendEmail}
                      markAsReadHandler={this._changeReadStatus} emails={emails.archive} replyHandler={this._showSendEmail} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>);
  }
}

export default App;