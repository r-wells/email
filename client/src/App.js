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
    emails: [],
    displaySendEmail: false
   }

   async componentDidMount() {
     await fetch('http://localhost:9000/emails', {
       method: "GET"
     }).then(res => {
       return res.json();
     }).then(data => {
       this.setState({emails: data}, () => window.localStorage.setItem('appInboxEmails', data));
     }).catch((err) => {
       console.error(err.message);
       const localEmails = window.localStorage.getItem('appInboxEmails');
       this.setState({
         emails: localEmails
       })
     })
   }

   _emailRedirect = (id) => {
     console.log('_emailRedirect')
     this.setState({email: this.state.emails.filter(e => {
      return e.id === id;
     })}, () => window.location.href = `/email/${id}`);
   }

   _changeReadStatus = async (id) => {
    const oldStateEmails = [...this.state.emails];
    oldStateEmails.forEach(email => {
      if(email.id === id) {
        email.isRead = !email.isRead
      }
    });
    this.setState({emails: oldStateEmails});
    await fetch(`http://localhost:9000/emails/edit/${id}`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).catch(err => console.error(err.message));
   }

   _showSendEmail = () => {
    this.setState(prevState => ({
      displaySendEmail: !prevState.displaySendEmail
    }), () => console.log(this.state));
   }

   _deleteEmail = async (id) => {
    await fetch(`http://localhost:9000/emails/edit/${id}`, {
      method: "DELETE",
      headers: { 'content-type': 'application/json' },
    }).then(res => res.json()).catch(err => console.error(err.message));
   }

  render() {
    const {displaySendEmail, emails} = this.state;
    return (
      <Router>
        <div>
          <NavBar />
            <div className="appContainer">
              <div className="wrapper">
                <SideBar sendEmailClickHandler={this._showSendEmail} />
                <div className="emailContainerWrapper">
                <Switch>
                  <Route exact path="/">
                    <EmailContainer sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail} markAsReadHandler={this._changeReadStatus} emailClickHandler={this._emailRedirect} emails={emails} />
                  </Route>
                  <Route path="/email/:emailId">
                    <Email deleteEmailHandler={this._deleteEmail} sendEmail={displaySendEmail} sendEmailHandler={this._showSendEmail} markAsReadHandler={this._changeReadStatus} emails={emails} />
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