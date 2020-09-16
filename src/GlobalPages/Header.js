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
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown.Item>
                            <Link className='linkDropdown'  to="/">Home</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link className='linkDropdown' to="/test">test</Link>
                        </NavDropdown.Item>
                        {this.props.Connexion ? ""  :  <NavDropdown.Item><Link className='linkDropdown'  to="/LogUp">log up</Link></NavDropdown.Item>}
                        {this.props.Connexion ? ""  :  <NavDropdown.Item><Link className='linkDropdown'  to="/Connect">Connect</Link></NavDropdown.Item>}
                        {this.props.Connexion ? <NavDropdown.Item><Link className='linkDropdown'  onClick={this.disconnectFunction.bind(this)} to="/">disconnection</Link></NavDropdown.Item>  :  ""}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }


}

export default Header;
