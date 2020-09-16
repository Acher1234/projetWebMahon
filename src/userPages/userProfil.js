import {Row,Col,Image,Form,Button,Modal} from "react-bootstrap"
import React from "react";
import Axios from "axios";


class UserProfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:false,text:"",type:""}
    }

    changeUsername()
    {
        this.setState({type:"username"})
        this.setState({show:true})
    }

    handleClose()
    {
        this.setState({show:false})
    }

    changeData()
    {
        Axios.post(this.props.URL + "/changeDataUser",{type:this.state.type,data:this.state.text},{withCredentials:true})
        this.setState({show:false})
    }

    render()
    {
        return (<div>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="https://www.google.com/search?q=image&sxsrf=ALeKk00G4XNQ_MYod_AiFuuBuBv1k0dksA:1600253662691&tbm=isch&source=iu&ictx=1&fir=nH5liarSz56duM%252CYMrfs-kIZ4Ew8M%252C_&vet=1&usg=AI4_-kSsnQljvqGJmDm2KNfil5ElFz17oA&sa=X&ved=2ahUKEwi11PW4we3rAhUSXMAKHdNUB3kQ9QF6BAgJEEU#imgrc=nH5liarSz56duM" />
                </Col>
                <Col>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label  style={{display:"inline-block",marginTop:"5px",marginRight:"10vw"}}>Name:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.prenom} />
                        <Button onClick={this.changeUsername.bind(this)} variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"7.3vw"}}>LastName:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.nom} />
                        <Button variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                    <Row style={{marginBottom:"0.9vh"}}>
                        <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"7.3vw"}}>Username:</Form.Label>
                        <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.username} />
                        <Button variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"2vw"}}>email:</Form.Label>
                    <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.email} />
                    <Button variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                </Col>
                <Col>
                    <Form.Label style={{display:"inline-block",marginTop:"5px",marginRight:"2vw"}}>address:</Form.Label>
                    <Form.Control disabled style={{display:"inline-block",width:"25vw"}} type="text" placeholder={this.props.user.adress} />
                    <Button variant="primary" style={{marginLeft:"2vw"}} type="submit">change</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" style={{marginLeft:"2vw"}} type="submit">change Password</Button>
                </Col>
            </Row>
            <Modal
                show={this.state.show}
                onHide={this.handleClose.bind(this)}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Form.Control style={{width:"25vw"}} onChange={(event)=>{this.setState({text : event.target.value});}}></Form.Control>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose.bind(this)}>
                        exit
                    </Button>
                    <Button variant="primary" onClick={this.changeData.bind(this)}>validate</Button>
                </Modal.Footer>
            </Modal>
        </div>)
    }


}

export default UserProfil;
