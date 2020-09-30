import {Row,Col,Image,Form,Button,Modal,Alert} from "react-bootstrap"
import React from "react";
import  FormData from "form-data"
import Axios from "axios";
import cryptojs from "crypto-js";
import LocationSearchInput from "../Connexion/LocationSearchInput";


class UserProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:false,showpassword:false,showlocation:false,text:"",type:"",ready:0,Alert:false}
    }

    changeUsername(e)
    {
        this.setState({type:e.target.id})
        this.setState({show:true})
    }

    changeLocation(e)
    {
        this.setState({type:e.target.id})
        this.setState({showlocation:true})
    }
    changePassword(e)
    {
        this.setState({type:e.target.id})
        this.setState({showpassword:true})
    }


    ChangeStateAdress(newadress,readyTemp)
    {
        this.setState({text:newadress,ready:readyTemp})
    }

    handleClose()
    {
        this.setState({show:false,showpassword:false,showlocation:false})
    }

    async changeData()
    {
        if(this.state.type == "address" && this.state.ready == 0)
        {
            this.setState({Alert:true})
            setTimeout(()=>{this.setState({Alert:false})},2000)
            this.setState({show:false,showpassword:false,showlocation:false})
            return;
        }
        await Axios.post(this.props.URL + "/changeDataUser",{type:this.state.type,data:this.state.text},{withCredentials:true})
        this.props.changeUser()
        this.setState({show:false,showpassword:false,showlocation:false})

    }

    async changePicture(event)
    {

         var formdata = new FormData();
        formdata.set('pic',event.target.files[0])
        formdata.set('police',"test")
        await Axios.post(this.props.URL+'/changeUserPics',formdata,{headers:{'Content-Type': 'multipart/form-data' },withCredentials:true})
        setTimeout(()=>{this.props.changeUser()},2000)
    }

    callFileChose()
    {
        document.getElementById("filePics").click()
    }


    render()
    {
        var disable = this.props.desactivate ? true : false
        var imagePath = this.props.user.flagImage ? this.props.URL + this.props.user.imagePath : this.props.user.urlImagePath;
        return (<div>
            {this.state.Alert ? <Alert style={{width:"25vw",marginLeft:"33.5vw"}}  variant={"danger"}>
                bad address
            </Alert>:""}
            <Row>
                <Col xs={6} md={4}>
                    <Image  style={{height:"171px",width:"180px"}} src={imagePath} roundedCircle onClick={this.callFileChose} />
                    <input disabled={disable} id="filePics" type="file" name="picture"  onChange={(event)=>{this.changePicture(event)}} style={{display:"none"}}/>
                </Col>
                <Col>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label  style={{display:"inline-block",marginTop:"5px",marginRight:"10vw"}}>Name:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.prenom} />
                        <Button disabled={disable} onClick={this.changeUsername.bind(this)}  id="prenom" variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"7.3vw"}}>LastName:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.nom} />
                        <Button disabled={disable} onClick={this.changeUsername.bind(this)}  id="nom" variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"7.3vw"}}>Username:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.username} />
                        <Button disabled  variant="primary" id="username"  onClick={this.changeUsername.bind(this)} style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"2vw"}}>email:</Form.Label>
                    <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.email} />
                    <Button disabled variant="primary" id="email"  onClick={this.changeUsername.bind(this)} style={{marginLeft:"2vw"}} type="submit">change</Button>
                </Col>
                <Col>
                    <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"2vw"}}>address:</Form.Label>
                    <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.address} />
                    <Button disabled={disable} variant="primary" id="address" onClick={this.changeLocation.bind(this)} style={{marginLeft:"2vw"}} type="submit">change</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!disable && <Button disabled={disable} variant="primary" id="password" onClick={this.changePassword.bind(this)} style={{marginLeft:"2vw"}} type="submit">change Password</Button>}
                </Col>
            </Row>
            <Modal
                show={this.state.show}
                onHide={this.handleClose.bind(this)}
                backdrop="static"
            >
                <Form.Control style={{width:"25vw"}} onChange={(event)=>{this.setState({text : event.target.value});}}></Form.Control>
                <Button variant="danger" onClick={this.handleClose.bind(this)}>
                    exit
                </Button>
                <Button variant="primary" onClick={this.changeData.bind(this)}>validate</Button>
            </Modal>





            <Modal
                show={this.state.showpassword}
                onHide={this.handleClose.bind(this)}
                backdrop="static"
            >
                <Form.Control style={{width:"25vw"}} type="password" onChange={(event)=>{this.setState({text : cryptojs.SHA256(event.target.value).toString()});}}></Form.Control>
                <Button variant="danger" onClick={this.handleClose.bind(this)}>
                    exit
                </Button>
                <Button variant="primary" onClick={this.changeData.bind(this)}>validate</Button>
            </Modal>


            <Modal
                show={this.state.showlocation}
                onHide={this.handleClose.bind(this)}
                backdrop="static"
            >
                    <LocationSearchInput function={this.ChangeStateAdress.bind(this)}></LocationSearchInput>
                    <Button variant="danger" onClick={this.handleClose.bind(this)}>
                        exit
                    </Button>
                    <Button variant="primary" onClick={this.changeData.bind(this)}>validate</Button>
            </Modal>
        </div>)
    }
}

export default UserProfil;
