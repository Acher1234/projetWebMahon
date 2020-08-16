import React from "react";
import { Form, Button } from "react-bootstrap";
import {ReactComponent} from "*.svg";
import {BrowserRouter as Router} from "react-router-dom";
import LocationSearchInput from './localisationInput'
import Axios from 'axios'


class Inscription extends React.Component<{URL:string}, { adress:any,ready:Number }>
{
    constructor(props:any)
    {
        super(props);
    }
    inscription(Newadress:any):any
    {
        this.setState({adress:Newadress})
    }
    componentWillMount()
    {
    }

    handleChange(newadress:any)
    {
        this.setState({adress:newadress})
    }

    render()
    {

        return (<Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="Prenom" placeholder="Enter Name" />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" id="Nom" placeholder="Enter Name" />
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" id="Username" placeholder="Enter Name" />
                <Form.Label>your picture</Form.Label>
                <Form.Control type="file" id="pic" placeholder="Enter Name" />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" >
                submit
            </Button>
        </Form>)
    }
}
export default Inscription;