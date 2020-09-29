import React from 'react';
import {Switch,BrowserRouter as Router,Link,Redirect,withRouter} from 'react-router-dom'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import $ from 'jquery'
import App from "./App";
import Axios from "axios";

class Header extends React.Component
{
    constructor(props) {
        super(props);
    }

    disconnectFunction()
    {
        Axios.post(this.props.URL + "/disconnect",{},{withCredentials:true});
        this.props.disconnectFunction();
    }

    render()
    {
        return(<div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Items Rental</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown.Item>
                            <Link className='linkDropdown'  to="/">Home</Link>
                        </NavDropdown.Item>
                        {this.props.Connexion ? ""  :  <NavDropdown.Item><Link className='linkDropdown'  to="/LogUp">Sign Up</Link></NavDropdown.Item>}
                        {this.props.Connexion ? ""  :  <NavDropdown.Item><Link className='linkDropdown'  to="/Connect">Connection</Link></NavDropdown.Item>}
                        {this.props.Connexion ? <NavDropdown.Item><Link className='linkDropdown'  onClick={this.disconnectFunction.bind(this)} to="/">Disconnection</Link></NavDropdown.Item>  :  ""}
                        {this.props.Connexion ? <NavDropdown.Item><Link className='linkDropdown'   to="/userProfile">Your Profil</Link></NavDropdown.Item>  :  ""}
                        {this.props.Connexion ? <NavDropdown.Item><Link className='linkDropdown'   to="/addItems">Add Items</Link></NavDropdown.Item>  :  ""}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}

export default Header;
