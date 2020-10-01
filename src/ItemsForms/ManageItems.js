import {Button, Form, FormControl, InputGroup, Card, Modal, Image, Col} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons"
import UserProfil from "../userPages/userProfil"
import React from "react";
import Axios from "axios";
import LocationSearchInput from "../Connexion/LocationSearchInput";


export default class ManageItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: false,objList:null, obj: null, show: false,itemNameModal:null, pricePerDayModal:null,addressModal:null}
        this.recupAllMyItems()
    }

    async onHide() {
        this.setState({show: false})
    }

    async recupAllMyItems() {
        var proprioID = this.props.user._id;
        var allMyItems = await Axios.post(this.props.URL + "/getAllObjfromUser", {proprioID}, {withCredentials: true})
        if (allMyItems.data == null) {
            this.setState({objList: null})
        } else {
            await this.setState({objList: allMyItems.data, loading: false})
        }
    }

    async getItemById(id) {
        var item = await Axios.post(this.props.URL + "/getItemById", {id: id}, {withCredentials: true})
        this.setState({obj: item.data, show: true,itemNameModal:item.data?.name, pricePerDayModal:item.data?.valuePerDay,addressModal:item.data?.address})
    }

    async removeObjById(id) {
        await Axios.post(this.props.URL + "/removeObjById", {id: id}, {withCredentials: true})
        await this.recupAllMyItems();
    }

    async ChangeStateAddress(newadress,readyTemp) {
        this.setState({addressModal:newadress,ready:readyTemp})
    }

    async editData()
    {
        var x = await Axios.post(
            this.props.URL + '/editObjet',
            {
                proprietaireId:this.props.user._id,
                objID:this.state.obj?._id,
                name:this.state.itemNameModal,
                address :this.state.addressModal,
                valuePerDay: this.state.pricePerDayModal
            },{withCredentials:true})
            if (x.data == 'success'){
                this.setState({show: false});
                this.recupAllMyItems();
            }
    }

    render() {
        {
            return this.state.loading ? <><p>loading...</p></> :
                <>
                    {this.state.objList?.map((value, index) => {
                        return <Card style={{width: '18rem', display: "inline-block"}}>
                            <Card.Body>
                                <Card.Title>{value.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{value.picture}</Card.Subtitle>
                                <Image style={{height:"171px",width:"180px"}} src={this.props.URL + '/image/ItemsImage/' + value.imagePath } />
                                <Card.Text>
                                    Price/Day : {value.valuePerDay}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button type="primary" onClick={() => this.getItemById(value._id)}>Show</Button>
                                <Button onClick={() => this.removeObjById(value._id)}><Trash/></Button>
                            </Card.Footer>
                        </Card>
                    })}
                    <Modal show={this.state.show} onHide={this.onHide.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.obj?.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled={true}
                                    value={this.state.obj?.categorie}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Sub-Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled={true}
                                    value={this.state.obj?.subCat}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Your item</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue={this.state.obj?.name}
                                    onChange={(event)=>{this.setState({itemNameModal : event.target.value});}}
                                />
                            </Form.Group>
                            <Form.Label>Picture of the Item</Form.Label>
                            <Form.Group >
                                <Image style={{height:"171px",width:"180px"}} src={this.props.URL + '/image/ItemsImage/' + this.state.obj?.imagePath } />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Address</Form.Label>
                                <LocationSearchInput style={{}} address={this.state.obj?.address}  function={this.ChangeStateAddress.bind(this)}></LocationSearchInput>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid address.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Price/Day</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Price/Day"
                                    defaultValue={this.state.obj?.valuePerDay}
                                    onChange={(event)=>{this.setState({pricePerDayModal : event.target.value});}}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid price.
                                </Form.Control.Feedback>
                            </Form.Group>
                        <Button onClick={() => this.editData()}>Edit this Item</Button>
                        </Modal.Body>
                    </Modal>
                </>
        }
    }
}