import React from "react";
import Socket from "socket.io-client"
import {FormControl,Button,Row} from "react-bootstrap";
import message from "./message";
import Axios from "axios";
import Message from "./message";


export default class Blog extends React.Component
{
    constructor(props) {
        super(props);
        this.update();
        this.recupAllmessage();
        this.state = {message:"",ListMessage: []}
        this.socket = Socket(this.props.URL)
        this.socket.on('refresh',()=>{this.recupAllmessage()})
    }
    async recupAllmessage()
    {
        var list = await Axios.get(this.props.URL + "/getMessage",{withCredentials:true})
        this.setState({ListMessage:list.data.messsageList})
    }
    async likeMessage(id)
    {
        this.socket.emit('like',id)
    }
    sendMessage()
    {
        if(this.state.message != "")
        {
            this.socket.emit('SendMessage',{id:this.props.user._id,data:this.state.message})
            this.setState({message:""})
        }
    }
    update()
    {

    }

    render()
    {
        return(<><div style={{width:"98vw",height:"80vh",backgroundColor:"rgb(241,243,244)",maxWidth:"100vw",overflowWrap: "break-word",wordWrap: "break-word",maxHeight:"80vh",overflowX:"scroll"}}>
            {this.state.ListMessage.map((value)=>
            {
                return <Message username={value.usernameAuteur} message={value.message} number={value.nbrLike} id={value._id} function={this.likeMessage.bind(this)}></Message>
            })}
        </div>
            <Row>
            <FormControl type="text" value={this.state.message} onChange={(e)=>{this.setState({message:e.target.value})}}
                         style={{marginTop:"1vh",border:"solid 1px black",width:"70vw",height:"7vh",marginLeft:"3vw"}}></FormControl>
            <Button type="submit" style={{marginLeft:"3vw",width:"10vw"}}  onClick={()=>{this.sendMessage()}}>Send</Button>
            </Row>
            </>)
    }
}
