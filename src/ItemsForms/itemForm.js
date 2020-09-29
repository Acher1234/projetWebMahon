import {Row,Col,Image,Form,Button,Modal} from "react-bootstrap"
import React from "react";
import Axios from "axios";
import cryptojs from "crypto-js";

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
    }
    fullname = this.props.user.nom + " " + this.props.user.prenom;

    state = {fullUser: this.fullname,itemName:"", address : this.props.user.address, categorie: "", subCat:"",pricePerDay:""};


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

    render() {
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Your item</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="i.e: My iPhone XS"
                            onChange={(event)=>{this.setState({itemName : event.target.value});}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your Name"
                                value = {this.state.fullUser}
                                disabled={true}
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={(event)=>{this.setState({postedBy : event.target.value});}}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>your picture</Form.Label>
                        <Form.Control type="file"   onChange={(event)=>{this.setState({file:event.target.files[0]})}}/>
                        <Form.Control.Feedback type="invalid">
                            Please upload a picture of your item.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please provide an adress."
                            value={this.state.address}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="1">
                        <Form.Label>Price/Day</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Price/Day"
                            onChange={(event)=>{this.setState({pricePerDay : event.target.value});}}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid price.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="i.e: Computer"
                            onChange={(event)=>{this.setState({categorie : event.target.value});}}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Sub-Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="i.e: Gaming Computer"
                            aria-describedby="inputGroupPrepend"
                            onChange={(event)=>{this.setState({subCat : event.target.value});}}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Add your Item</Button>
            </Form>
        );
    }
}
export default ItemForm;