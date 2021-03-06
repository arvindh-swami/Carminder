import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, MenuItem, IconMenu, IconButton } from 'material-ui';
import ChangePasswordModal from './ChangePasswordModal'
import EditProfileModal from './EditProfileModal'
import DeleteProfileModal from './DeleteProfileModal'
import history from '../../history'
import './Topbar.css';

class DesktopTopbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      deleteModal: false,
      passwordModal:false,
    }
  }

  signOut = () => {
    try {
      localStorage.removeItem('carkeeper-app')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    history.go('/')
  }

  closeModal=()=>{
    this.setState({
      editModal: false,
      deleteModal: false,
      passwordModal:false,
    })
  }

  render() {
    let toSend={
      ...this.state,
      ...this.props,
      signOut:this.signOut,
      closeModal:this.closeModal,
    }
    return (
      <Toolbar
        style={{ backgroundColor: 'var(--color3)', color: 'var(--color1)' }}
        className='desktop-bar'
      >
        <ToolbarGroup>
          <h1 className='desktop-topbar-title'>CarKeeper</h1>
        </ToolbarGroup>
        <ToolbarGroup>
          <IconMenu
            iconButtonElement={<IconButton><i className="material-icons md-light md-36">&#xE8FE;</i></IconButton>}
            onChange={this.handleMenu}
            style={{ marginLeft: '20px' }}
          >
            <MenuItem primaryText='Edit Profile' onClick={() => this.setState({ editModal: true })} />
            <MenuItem primaryText='Change Password' onClick={() => this.setState({ passwordModal: true })} />
            <MenuItem primaryText='Delete Account' onClick={() => this.setState({ deleteModal: true })} />
            <MenuItem onClick={this.signOut} primaryText='Sign Out' />
          </IconMenu>
        </ToolbarGroup>
        <ChangePasswordModal {...toSend} />
        <EditProfileModal {...toSend} />
        <DeleteProfileModal {...toSend} />
      </Toolbar >
    );
  }
}

export default DesktopTopbar;
