import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import $ from "jquery";
import GoogleLogin from 'react-google-login';
import "./connect.css"
import {User} from "../GlobalPages/Class";
import cryptojs from "crypto-js";
import Axios from "axios";


class ConnectComponant extends React.Component {
    constructor(props) {
        super(props);
    }

    ConnexionLocal()
    {
        var objet = this;
        var password = $('#Password').val()
        password = cryptojs.SHA256(password).toString();
        var Username = $('#UserName').val()
        $("#Password").removeClass("is-invalid");
        $("#UserName").removeClass("is-invalid");
        if(password == "")
        {
            $("#Password").addClass("is-invalid");
            return;
        }
        if(Username == "")
        {
            $("#UserName").addClass("is-invalid");
            return;
        }
        Axios.post(this.props.URL+'/Login', {username:Username,password:password},
        {withCredentials:true})
        .then((response)=>{
            //handle success
            if(response.data == 'error')
            {
                $("#Password").addClass("is-invalid");
                $("#UserName").addClass("is-invalid");
            }
            else
            {
                this.props.function()
                window.location.href = '/'

            }
        })
        .catch((e)=>{alert(e)})
    }

    async googletokenConnection(reponse)
    {
        var objet = this;
        await $.ajax({
            url: objet.props.URL+'/google/auth/token',
            method:'GET',
            xhrFields:{withCredentials:true},
            data:{access_token:reponse.tokenId},
            success:function (data)
            {
            }
        })
        this.props.function()
    }


    render()
    {
        return (<React.Fragment>
            <Form className="formgroup">
                <FormControl className="form" id='UserName' placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                <FormControl className="form"  id='Password' type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                <Button onClick={() => {this.ConnexionLocal()}} type='button' variant="primary" style={{marginLeft: '2vw'}}>Log In</Button>
                <Link to='/logUp'><Button style={{marginLeft: '2vw'}}>log Up</Button></Link>
                <GoogleLogin
                    clientId="829121400520-g6jc9th3bd6il8opdcfqgqgu10n3ed0f.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.googletokenConnection.bind(this)}
                    onFailure={this.googletokenConnection.bind(this)}
                    cookiePolicy={'single_host_origin'}
                />,
            </Form></React.Fragment>);
    }
}

export default ConnectComponant;
