import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import $ from "jquery";
import GoogleLogin from 'react-google-login';
import "./connect.css"
import {User} from "../GlobalPages/Classes";


class ConnectComponant extends React.Component <{function:any,URL:string},{}> {
    constructor(props:any) {
        super(props);
    }

    ConnexionLocal()
    {
        var objet = this;
        var password = $('#Password').val()
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
        $.ajax({
            url:objet.props.URL+'/Login',
            method:'POST',
            xhrFields:{withCredentials:true},
            data:{userName:Username,Password:password},
            success:function (data)
            {
                if(data == 'error')
                {
                    $("#Password").addClass("is-invalid");
                    $("#UserName").addClass("is-invalid");
                }
                else
                {
                    objet.props.function();
                }
            }
        })
    }

    async googletokenConnection(reponse:any)
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
                <FormControl className="form" id='Password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
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
