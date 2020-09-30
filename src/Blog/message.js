import React from "react";
import Socket from "socket.io-client"
import {Row} from "react-bootstrap";
import {SuitHeart} from "react-bootstrap-icons";

export default class message extends React.Component
{
    constructor(props) {
        super(props);

    }


    render()
    {
        return(<div style={{borderBottom:"solid black 1px"}}>
            <Row>
                <h6>this.props.username</h6>
                <p>this.props.message</p>
                <button onClick={this.props.function(this.props.id)}><SuitHeart/></button>
            </Row>
            </div>)
    }
}
