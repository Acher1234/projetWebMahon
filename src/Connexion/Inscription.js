import React from "react";
import { Form, Button } from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";
import {Redirect} from "react-router-dom";
import LocationSearchInput from './LocationSearchInput'
import Axios from 'axios'
import formData from 'form-data'
import { ready } from "jquery";
import cryptojs from "crypto-js";


class Inscription extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }

    state = {redirect:false,adress:"",ready:0,email:"",name:"",lastName:"",password:"",userName:"",style:{}};

    verify()
    {
        if(this.state.ready == 0 || this.state.adress == "" || this.state.email == "" || this.state.name == "" || this.state.password == "" ||  this.state.userName == "" || this.state.lastName == "")
        {
            return false;
        } 
        else
        {
            return true;
        }
    }
    sendData()
    {
        if(!this.verify())
        {
            return null;
        }
        var Form = new FormData();
        Form.set('email',this.state.email)
        Form.set('name',this.state.name)
        Form.set('lastName',this.state.lastName)
        Form.set('password',cryptojs.SHA256(this.state.password))
        Form.set('userName',this.state.userName)
        Form.set('address',this.state.adress)
        Form.set('pic',this.state.file)
        Axios({
            method: 'post',
            url: this.props.URL + '/createUser',
            data: Form,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then((response)=>{
                //handle success
                if(response.data == "perfect")
                {
                        this.setState({redirect:true})
                }
            })
            .catch((e)=>{alert(e)})
        console.log('send')
    }
    verifyUsername(userNameTest)
    {
        Axios({
            method: 'post',
            url: this.props.URL + '/verifyUsername',
            data: {userName:userNameTest},
            })
            .then((response)=>{
                console.log(response.data)
                if(response.data == "ok")
                {
                this.setState({style:{borderColor:"green"}})
                }
                else
                {
                    this.setState({style:{borderColor:"red"}})
                }
            })
            .catch((e)=>{alert(e)})
    }

    ChangeStateAdress(newadress,readyTemp)
    {
        this.setState({adress:newadress,ready:readyTemp})
    }

    render()
    {
        return this.state.redirect ? <Redirect to="/Connect" />:(<Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  value={this.state.email} onChange={(event)=>{this.setState({email : event.target.value});}} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"  value={this.state.name} onChange={(event)=>{this.setState({name : event.target.value});}} placeholder="Enter Name" />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={(event)=>{this.setState({lastName : event.target.value});}} value={this.state.lastName} placeholder="Enter Lastname" />
                <Form.Label>Username</Form.Label>
                <Form.Control style={this.state.style} type="text" value={this.state.userName} onChange={(event)=>{this.setState({userName : event.target.value});this.verifyUsername(event.target.value);}} placeholder="Enter Name" />
                <Form.Label>your picture</Form.Label>
                <Form.Control type="file"   onChange={(event)=>{this.setState({file:event.target.files[0]})}}/>
                <Form.Label>your address</Form.Label>
                <LocationSearchInput style={{}} function={this.ChangeStateAdress.bind(this)}></LocationSearchInput>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  onChange={(event)=>{this.setState({password : event.target.value});}} value={this.state.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={this.sendData.bind(this)}>
                submit
            </Button>
        </Form>)
    }
}
export default Inscription;