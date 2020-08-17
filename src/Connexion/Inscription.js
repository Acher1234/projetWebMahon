import React from "react";
import { Form, Button } from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";
import LocationSearchInput from './LocationSearchInput'
import Axios from 'axios'
import formData from 'form-data'
import { ready } from "jquery";


class Inscription extends React.Component
{
    constructor(props)
    {
        super(props);
        
    }

    state = {adress:"",ready:0,email:"",name:"",lastName:"",password:"",userName:""};
    sendData()
    {
        alert(this.props.URL)
        var Form = new FormData();
        Form.append('email',this.state.email)
        Form.append('name',this.state.name)
        Form.append('lastName',this.state.lastName)
        Form.append('password',this.state.password)
        Form.append('userName',this.state.userName)
        Form.append('pic',this.state.file,'pic.jpg')
        Axios({
            method: 'post',
            url: this.props.URL + '/createUser',
            data: Form,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then((response)=>{
                //handle success
                console.log(response);
            })
    }

    ChangeStateAdress(newadress,readyTemp)
    {
        this.setState({adress:newadress,ready:readyTemp})
    }

    render()
    {
        
        return (<Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  value={this.state.email} onChange={(event)=>{this.setState({email : event.target.value});}} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(event)=>{this.setState({lastName : event.target.value});}} value={this.state.lastName} placeholder="Enter Lastname" />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"  value={this.state.name} onChange={(event)=>{this.setState({name : event.target.value});}} placeholder="Enter Name" />
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={this.state.userName} onChange={(event)=>{this.setState({userName : event.target.value});}} placeholder="Enter Name" />
                <Form.Label>your picture</Form.Label>
                <LocationSearchInput function={this.ChangeStateAdress.bind(this)}></LocationSearchInput>
                <Form.Control type="file"  onChange={(event)=>{this.setState({file:event.target.files[0]})}}/>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  onChange={(event)=>{this.setState({password : event.target.value});}} value={this.state.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.sendData}>
                submit
            </Button>
        </Form>)
    }
}
export default Inscription;