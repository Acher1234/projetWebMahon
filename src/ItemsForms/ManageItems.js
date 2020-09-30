import {Button, Form, FormControl, InputGroup, Card, Modal} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons"
import UserProfil from "../userPages/userProfil"
import React from "react";
import Axios from "axios";


export default class ManageItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading:false,objList:null,obj:null,show:false}
        this.recupAllMyItems()
    }

    async onHide()
    {
        this.setState({show:false})
    }
    async recupAllMyItems()
    {
        var proprioID = this.props.user._id;
        var allMyItems = await  Axios.post(this.props.URL + "/getAllObjfromUser",{proprioID},{withCredentials:true})
        if(allMyItems.data == null)
        {
            this.setState({objList:null})
        }
        else
        {
            this.setState({objList:allMyItems.data,loading:false})
        }
    }
    async getItemById(id)
    {
        var item = await Axios.post(this.props.URL + "/getItemById",{id:id},{withCredentials:true})
        this.setState({obj:item.data,show:true})
    }
    async remove(id)
    {
        var response = await Axios.post(this.props.URL + "/removeUser",{id:id},{withCredentials:true})
        this.userRecup()
    }
    render()
    {
        return this.state.loading ? <><p>loading...</p></> :
            <>

                        <Card style={{ width: '18rem',display:"inline-block"}}>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            </Card.Body>
                            <Card.Footer>
                            </Card.Footer>
                        </Card>
                        <Card style={{ width: '18rem',display:"inline-block",color:"red"}}>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button type="primary" onClick={()=>this.afficheData} > affichage</Button>
                                <Button onClick={()=>this.remove()}><Trash/></Button>
                            </Card.Footer>
                        </Card>
                <Modal show={this.state.show} onHide={this.onHide.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.user?.nom}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserProfil URL={this.props.URL} user={this.state.user} desactivate={true}/>
                    </Modal.Body>
                </Modal>
            </>
    }
}
