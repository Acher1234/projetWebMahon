import {Button, Form, FormControl, InputGroup, Card, Modal} from "react-bootstrap";
import  {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {Trash} from "react-bootstrap-icons"
import UserProfil from "../userPages/userProfil"
import React from "react";
import Axios from "axios";


export default class AdminPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect:false,listOfpersonal:null,loading:true,show:false,user:null}
        this.userRecup()
    }

    async onHide()
    {
        this.setState({show:false})
    }
    async userRecup()
    {
        var objetPersonal =await  Axios.get(this.props.URL + "/recupAllUser",{withCredentials:true})
        if(objetPersonal.data == null)
        {
            this.setState({listOfpersonal:null,loading:true})
            setTimeout(this.userRecup(),2000)
        }
        else
        {
            this.setState({listOfpersonal:objetPersonal.data,loading:false})
        }

    }

    async afficheData(id)
    {
        alert(id)
        var user =await Axios.post(this.props.URL + "/recupUserOnId",{id:id},{withCredentials:true})
        this.setState({user:user.data})
        this.setState({show:true})
    }
    async makeItAdmin(id)
    {
        var response = await Axios.post(this.props.URL + "/adminUser",{id:id},{withCredentials:true})
        alert(response.data)
        this.userRecup()
    }
    async remove(id)
    {
        var response = await Axios.post(this.props.URL + "/removeUser",{id:id},{withCredentials:true})
        alert(response.data)
        this.userRecup()
    }
    render()
    {
        return this.state.loading ? <><p>loading...</p></> :
            <>
                {this.state.listOfpersonal.map((value,index)=>
                {
                    return value.adminNumber == 0 ?
                    <Card style={{ width: '18rem',display:"inline-block"}}>
                        <Card.Body>
                            <Card.Title>{value.email}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{value.nom}</Card.Subtitle>
                            <Card.Text>
                                {value.prenom}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="primary" onClick={()=>this.afficheData(value._id)} > affichage</Button>
                            <Button type="primary" onClick={()=>this.makeItAdmin(value._id)} > Admin</Button>
                            <Button onClick={()=>this.remove(value._id)}><Trash/></Button>
                        </Card.Footer>
                    </Card>
                        :
                    <Card style={{ width: '18rem',display:"inline-block",color:"red"}}>
                        <Card.Body>
                            <Card.Title>{value.email}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{value.nom}</Card.Subtitle>
                            <Card.Text>
                                {value.prenom}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="primary" onClick={()=>this.afficheData(value._id)} > affichage</Button>
                            <Button onClick={()=>this.remove(value._id)}><Trash/></Button>
                        </Card.Footer>
                    </Card>
                })}
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

