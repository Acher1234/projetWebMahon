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
        password = cryptojs.SHA256(password);
        alert(password)
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
        Axios({
        method: 'post',
        url: this.props.URL+'/Login',
        data: {userName:Username,Password:password},
    })
        .then((response)=>{
            //handle success
            if(response.data == 'error')
            {
                $("#Password").addClass("is-invalid");
                $("#UserName").addClass("is-invalid");
            }
            else
            {
                objet.props.function();
            }
        })
        .catch((e)=>{alert(e)})
        console.log('send')

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
        await $.ajax(
            {
                url:objet.props.URL+'/recupUser',
                data:{},
                xhrFields:{withCredentials:true},
                method:'GET',
                success:function (data) {
                    objet.props.function();
                }
            })
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
