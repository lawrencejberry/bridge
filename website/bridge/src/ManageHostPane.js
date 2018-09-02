import React, { Component } from 'react';
import './ManageHostPane.css';

import Button from './Button.js';
import sendRequest from './sendRequest.js';
import EditSocietyPanel from './EditSocietyPanel.js';

class ManageHostPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      host: this.props.host,
      user: this.props.user,
      newAdmin: '',
      warningPopUp: null
    };
  }

  generateWarningPopUp() {
    return (
      <div className="ManageHostPane-warning-pop-up">
        <div className="ManageHostPane-warning-pop-up-contents">
          <label style={{fontSize: 26, fontFamily: 'avenir', marginBottom: 40}}>Confirm Delete</label>

          <label style={{marginBottom: 6}}>{'Are you sure you want to delete "' + this.props.host.name + '"?'}</label>
          <label>You cannot undo this operation</label>

          <div style={{display: 'flex', flexDirection: 'row', marginTop: 40}}>
            <Button positive={false} text="Cancel" onClick={() => this.cancelDeleteHost()}
              style={{marginTop: 0, marginBottom: 10, marginRight: 4}} />

            <Button positive={true} text="Delete" onClick={() => this.deleteHost()}
              style={{marginTop: 0, marginBottom: 10, marginRight: 4, backgroundColor: '#d44', borderColor: '#b22'}} />
          </div>
        </div>
      </div>
    );
  }

  generateAdminRows() {
    var width = 50;
    var height = 28;

    var bonusButtonStyle = {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,

      fontSize: 11,
      width:  width,
      height: height,

      backgroundColor: '#d44',
      borderColor: '#b22'
    };

    return this.state.host.admins.map((admin) =>
      <div className="ManageHostPane-admin-row" key={admin.id}>
        <label>{admin.email}</label>
        {admin.email !== this.state.user.email
          ? <Button positive={true} text="Remove" onClick={() => this.deleteAdmin(admin.id, false)} style={bonusButtonStyle} />
          : <Button positive={true} text="Leave" onClick={() => this.leaveHost(admin.id)} style={{...bonusButtonStyle, backgroundColor: '#db6', borderColor: '#ca5'}} />}
      </div>
    );
  }

  render() {
    var bonusButtonStyle = {
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 0,
      marginRight: 30
    };

    return (
      <div className="ManageHostPane">
        {this.state.warningPopUp}

        <div className="ManageHostPane-top-bar">
          <label className="ManageHostPane-header">Manage</label>
          <Button positive={true} text="Delete" onClick={() => this.tryDeleteHost()}
            style={{marginTop: 0, marginBottom: 10, marginRight: 4, backgroundColor: '#d44', borderColor: '#b22'}} />
        </div>

        <div className="ManageHostPane-main">
          <EditSocietyPanel creating={false} onEdit={() => this.refreshHost()} host={this.state.host} user={this.state.user} />

          <div className="ManageHostPane-panel">
            <label className="ManageHostPane-panel-title">Admins</label>

            <div style={{borderTop: '1px solid #ccc', flex: 1, overflow: 'scroll'}}>
              {this.generateAdminRows()}
              <div className="ManageHostPane-admin-row">
                <input type="text" placeholder="New admin" style={{border: 'none', fontSize: 16, flex: 1, marginRight: 30}}
                  onChange={(e) => {this.state.newAdmin = e.target.value; this.setState(this.state);}} value={this.state.newAdmin}/>
                <Button positive={true} text="Add" style={{
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,

                  fontSize: 11,
                  width:  50,
                  height: 28
                }} onClick={() => this.newAdmin()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteAdmin(adminIdToDelete, shouldRefreshAll) {
    var adminIds = this.state.host.admins.map((admin) => admin.id);
    console.log(adminIds);
    console.log(adminIdToDelete);
    console.log(this.state.user);
    var index = adminIds.indexOf(adminIdToDelete);

    if (index > -1) {
      adminIds.splice(index, 1);
    }
    else {
      console.log("Index not found when removing admin");
      return;
    }

    sendRequest({
      address: "hosts/" + this.state.host.id + "/",
      method: "PATCH",
      authorizationToken: this.state.user.token,
      body: {admins_id: adminIds},
      responseHandlerNoJson: (response) => {shouldRefreshAll ? this.props.onLeftHost() : this.refreshHost()},
    });
  }

  newAdmin() {
    if (this.state.newAdmin.length === 0) {
      // TODO: Tell the user to enter an email
      return;
    }

    sendRequest({
      address: "hosts/" + this.state.host.id + "/add_admin/",
      method: "POST",
      authorizationToken: this.state.user.token,
      body: {email: this.state.newAdmin},
      responseHandlerNoJson: (response) => {this.refreshHost();},
    });
  }

  refreshHost() {
    sendRequest({
      address: "hosts/" + this.state.host.id + "/",
      method: "GET",
      authorizationToken: this.state.user.token,
      successHandler: (result) =>
        {this.setState({...this.state, host: result, user: this.state.user, newAdmin: ''}); this.props.onHostUpdated();},
    });
  }

  leaveHost(userAdminId) {
    this.deleteAdmin(userAdminId, true);
  }

  tryDeleteHost() {
    this.setState({...this.state, warningPopUp: this.generateWarningPopUp()});
  }

  cancelDeleteHost() {
    this.setState({...this.state, warningPopUp: null});
  }

  deleteHost() {
    sendRequest({
      address: 'hosts/' + this.state.host.id + '/',
      method: 'DELETE',
      authorizationToken: this.state.user.token,
      responseHandlerNoJson: () => {
        this.setState({...this.state, warningPopUp: null});
        this.props.onLeftHost();
      }
    });
  }

}

export default ManageHostPane;
