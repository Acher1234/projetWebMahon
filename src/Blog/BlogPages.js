import React from "react";
import Socket from "socket.io-client"
import {FormControl} from "react-bootstrap";
import message from "./message";


export default class Blog extends React.Component
{
    constructor(props) {
        super(props);
        this.update();
        this.recupAllmessage();
        this.state = {message:""}
    }
    async recupAllmessage()
    {

    }
    sendMessage()
    {

    }
    update()
    {
        const socket = Socket(this.props.URL)
    }

    render()
    {
        return(<><div style={{width:"100vw",height:"80vh",backgroundColor:"rgb(241,243,244)"}}>

        </div>
            <FormControl type="text" value={message} style={{marginTop:"1vh",border:"solid 1px black",width:"100vw",height:"10vh"}}></FormControl>
        </>)
    }
}
