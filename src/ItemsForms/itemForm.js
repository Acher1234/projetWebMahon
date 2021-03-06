import  {Alert, Row,Col,Image,Form,Button,Modal} from "react-bootstrap"
import React from "react";
import Axios from "axios";
import cryptojs from "crypto-js";
import LocationSearchInput from "../Connexion/LocationSearchInput";
import UserProfil from "../userPages/userProfil";
import {PayPalButton} from "react-paypal-button-v2";
import Var from "../Variable"

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.fullname = this.props.user.nom + " " + this.props.user.prenom;
        this.state = {
            categorieList:null,
            subCatList:null,
            disabledSubCat:false,
            fullUser: this.fullname,
            itemName:"",
            address : this.props.user.address,
            categorie: "",
            subCat:"",
            pricePerDay:"",
            showCat:false,
            showSub:false,
            categorieForm:"", // se refere a modal uniquement
            subCategorieForm:"" ,// se refere a modal uniquement
            subSuccess:false,
            catSuccess:false,
            objSuccess:false,
            file:null,
            paypalReady:false
        };
        this.recupListOfCategorie();
        this.recupListOfSubCat();
    }

    Paypalintegration() // a arranger
    {
        if(this.state.itemName == "" || this.state.pricePerDay == "" || parseInt(this.state.pricePerDay) == NaN || this.state.file == null)
        {
            this.setState({paypalReady:false})//true
            return;
        }
        this.setState({paypalReady:true})
    }
    closePaypal() // a arranger
    {
        this.setState({paypalReady:false})
    }
    sendDataPaypal(details,data)
    {
        var Form = new FormData();
        Form.set('proprietaireId',this.props.user._id)
        Form.set('categorie',this.state.categorie)
        Form.set('subCat',this.state.subCat)
        Form.set('name',this.state.itemName)
        Form.set('address',this.state.address)
        Form.set('valuePerDay',this.state.pricePerDay)
        Form.set('picture',this.state.file)
        Form.set('acceptId',data.orderID)
        Axios.post(this.props.URL + '/createObjet',Form,{withCredentials:true,"Content-Type":'multipart/form-data'})
            .then((response)=>{
                //handle success
                if(response.data == "success")
                {
                    this.setState({objSuccess:true})
                    this.setState({paypalReady:false})
                }
            })
            .catch((e)=>{alert(e)})
        this.setState({paypalReady:false})
    }

    async sendCatData()
    {
        var x = await Axios.post(this.props.URL + '/createCat',{nameCategorie: this.state.categorieForm},{withCredentials:true})
        if (x.data == 'success')
        {
            this.setState({showCat:false,catSuccess:true})
        }
        setTimeout(() => {this.setState({catSuccess:false})}, 2500);
        this.recupListOfCategorie();
    }

    async sendSubCatData()
    {
        var x = await Axios.post(this.props.URL + '/createSubCat',{nameSubCat: this.state.subCategorieForm,nameSupCat: this.state.categorieForm},{withCredentials:true})
        if (x.data == 'success')
        {
           this.setState({showSub:false,subSuccess:true,categorie:this.state.categorieForm})
        }
        setTimeout(() => {this.setState({subSuccess:false})}, 2500);
        this.recupListOfSubCat(this.state.categorieForm);
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
       var x = await Axios.get(this.props.URL + '/recupAllCategorie',{withCredentials:true});
        if(x.data?.tabOfCat?.length > 0)
        {
            this.setState({categorieList : x.data?.tabOfCat,categorie:x.data?.tabOfCat[0]})
            this.recupListOfSubCat(x.data?.tabOfCat[0])
        }
        else{
            this.setState({subCatList:null});
        }
    }
    async recupListOfSubCat(nameSup)
    {
        await this.setState({categorie:nameSup});
        var x = await Axios.post(this.props.URL + '/recupAllSubCatFromSup',{nameSupCat: this.state.categorie},{withCredentials:true});
        if(x.data?.tabOfSubCat?.length > 0)
        {
            this.setState({subCatList : x.data?.tabOfSubCat,subCat:x.data?.tabOfSubCat[0]})
        }
    }

    render() {
        return (
            <Form >
                <Alert transition={true} show={this.state.objSuccess} key='success' variant='success'>
                    You added a new Item. You can edit it in "Manage Items".
                </Alert>
                <Alert transition={true} show={this.state.catSuccess} key='success' variant='success'>
                    You added a new Categorie.
                </Alert>
                <Alert transition={true} show={this.state.subSuccess} key='success' variant='success'>
                    You added a new Sub-Categorie.
                </Alert>
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
                        <Form.Control as="select" value={this.state.categorie} onChange={(e)=>{this.recupListOfSubCat(e.target.value)}} >
                            {this.state.categorieList?.map(value=>{return <option>{value}</option>})}
                        </Form.Control>
                        <Button onClick={() => this.handleClickCat()} variant="dark"> + Add a new Category </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Sub-Category</Form.Label>
                        <Form.Control as="select" onChange={(e)=>{this.setState({subCat:e.target.value})}}  defaultValue="i.e: Computer">
                            {this.state.subCatList?.map(value=>{return <option>{value}</option>})}
                        </Form.Control>
                        <Button onClick={() => this.handleClickSub()} variant="dark"> + Add a new Sub-Category </Button>
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

                <Button onClick={() => this.Paypalintegration()}>Add your Item</Button>


                <Modal show={this.state.paypalReady} onHide={this.closePaypal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>pay your Items</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PayPalButton
                            amount={1}
                            options={{
                                clientId:Var.clientPaypalId
                            }}
                            onSuccess={this.sendDataPaypal.bind(this)}
                        />
                    </Modal.Body>
                </Modal>
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
                        <Form.Group md={2} controlId="formGridState">
                            <Form.Label>Please select a Category</Form.Label>
                            <Form.Control as="select" onChange={(e)=>{this.setState({categorieForm:e.target.value})}}>
                                {this.state.categorieList?.map(value=>{return <option>{value}</option>})}
                            </Form.Control>
                        </Form.Group>
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
                        <Button onClick={() => this.sendSubCatData()}>Add a new Sub-Category</Button>
                    </Modal.Body>
                </Modal>
            </Form>
        );
    }
}
export default ItemForm;