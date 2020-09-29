import {Row,Col,Image,Form,Button,Modal} from "react-bootstrap"
import React from "react";
import Axios from "axios";
import cryptojs from "crypto-js";
import LocationSearchInput from "../Connexion/LocationSearchInput";
import UserProfil from "../userPages/userProfil";

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.fullname = this.props.user.nom + " " + this.props.user.prenom;
        this.state = {
            categorieList:null,
            disabledSubCategorie:false,
            fullUser: this.fullname,
            itemName:"",
            address : this.props.user.address,
            categorie: "",
            subCat:"",
            pricePerDay:"",
            showCat:false,
            showSub:false,
            categorieForm:"",
            subCategorieForm:""
        };
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

    async sendCatData()
    {
        await Axios.post(this.props.URL + '/createCat',{nameCategorie: this.state.categorieForm},{withCredentials:true})
        this.setState({showCat:false})
    }

    ChangeStateAdress(newadress,readyTemp)
    {
        this.setState({address:newadress,ready:readyTemp})
    }

    handleClickCat()
    {
        this.setState({showCat:true})
    }

    handleClickSub()
    {
        this.setState({showSub:true})
    }

    async onHide()
    {
        this.setState({showCat:false,showSub:false})
    }

    async recupListOfCategorie()
    {
        //await Axios.get(this.props.'')
    }



    render() {
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this.recupListOfCategorie();
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
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
                </Form.Row>



                <Form.Row>
                    <Form.Group as={Col} md={2} controlId="formGridState">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select"  defaultValue="i.e: Computer">
                            {this.state.categorieList?.map(value=>{return <option>{value}</option>})}
                        </Form.Control>
                        <Button onClick={() => this.handleClickCat()} variant="dark"> + Add a new Category </Button>
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
                        <Button onClick={() => this.handleClickSub()} variant="dark"> + Add a new Sub-Category </Button>{' '}
                    </Form.Group>
                </Form.Row>



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
                        <Form.Label>Picture of the Item</Form.Label>
                        <Form.Control type="file"   onChange={(event)=>{this.setState({file:event.target.files[0]})}}/>
                        <Form.Control.Feedback type="invalid">
                            Please upload a picture of your item.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} md="3">
                        <Form.Label>Address</Form.Label>
                        <LocationSearchInput style={{}} address={this.state.address}  function={this.ChangeStateAdress.bind(this)}></LocationSearchInput>
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

                <Button type="submit">Add your Item</Button>


                <Modal show={this.state.showCat} onHide={this.onHide.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group md="2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="i.e: Computer"
                                onChange={(event)=>{this.setState({categorieForm : event.target.value});}}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={() => this.sendCatData()} type="submit">Add a new Category</Button>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showSub} onHide={this.onHide.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new Sub-Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group md="2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="i.e: Gaming Computer"
                                onChange={(event)=>{this.setState({subCategorieForm : event.target.value});}}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={() => console.log("cava ou quoi?")} type="submit">Add a new Sub-Category</Button>
                    </Modal.Body>
                </Modal>
            </Form>
        );
    }
}
export default ItemForm;