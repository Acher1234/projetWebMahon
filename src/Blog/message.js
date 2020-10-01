import React from "react";
import Socket from "socket.io-client"
import {Row} from "react-bootstrap";
import {SuitHeart} from "react-bootstrap-icons";

export default class Message extends React.Component
{
    constructor(props) {
        super(props);

    }


    render()
    {
        return(<div style={{borderBottom:"solid black 1px",maxWidth:"87vw",overflowWrap: "break-word",wordWrap: "break-word",overflowY:""}}>
            <h6 style={{marginLeft:"4vw"}}>{this.props.username}</h6>
            <Row>
                <p style={{marginLeft:"9vw",maxWidth:"70vw",width:"70vw",overflowWrap: "break-word",wordWrap: "break-word"}}>{this.props.message}</p>
                <button style={{marginLeft:"80vw"}} onClick={()=>{this.props.function(this.props.id)}}><SuitHeart/></button>
                <p>{this.props.number}</p>
            </Row>
            </div>)
    }
}
