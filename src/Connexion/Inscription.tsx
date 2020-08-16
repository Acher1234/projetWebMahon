import React from "react";
import { Form, Button } from "react-bootstrap";
import {ReactComponent} from "*.svg";
import {BrowserRouter as Router} from "react-router-dom";
import LocationSearchInput from './localisationInput'
import Axios from 'axios'
import formData from 'form-data'
import { ready } from "jquery";


class Inscription extends React.Component<{URL:string}, { adress:any,ready:Number,email:any,file:any,name:string,lastName:string,password:string,userName:string}>
{
    constructor(props:any)
    {
        super(props);
    }
    componentWillMount()
    {
        this.setState({email:"",name:"",lastName:"",password:"",userName:""});
    }

    sendData()
    {
        var Form = new FormData();
        Form.append('email',this.state.email)
        Form.append('name',this.state.name)
        Form.append('lastName',this.state.lastName)
        Form.append('password',this.state.password)
        Form.append('userName',this.state.userName)
        Form.append('pic',this.state.file,'pic.jpg')
        Axios({
            method: 'post',
            url: 'myurl',
            data: Form,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then((response:any)=>{
                //handle success
                console.log(response);
            })
    }

    ChangeStateAdress(newadress:any,readyTemp:number)
    {
        this.setState({adress:newadress,ready:readyTemp})
    }

    render()
    {
        
        return (<Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" value={this.state.email} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="Prenom" value={this.state.lastName} placeholder="Enter Lastname" />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" id="Nom" value={this.state.name} placeholder="Enter Name" />
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" id="Username" value={this.state.userName} placeholder="Enter Name" />
                <Form.Label>your picture</Form.Label>
                <LocationSearchInput function={this.ChangeStateAdress.bind(this)}></LocationSearchInput>
                <Form.Control type="file" id="pic"  onChange={(e:any)=>{this.setState({file:e.target.files[0]})}}/>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" value={this.state.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.sendData}>
                submit
            </Button>
        </Form>)
    }
}
export default Inscription;