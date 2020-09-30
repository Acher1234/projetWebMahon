import React from "react";
import Socket from "socket.io-client"
import {FormControl} from "react-bootstrap";


export default class Blog extends React.Component
{
    constructor(props) {
        super(props);
    }

    update()
    {
        const socket = Socket()
    }

    render()
    {
        return(<><div style={{width:"100vw",height:"80vh",backgroundColor:"rgb(241,243,244)"}}>

        </div>
            <FormControl type="text" style={{marginTop:"1vh",border:"solid 1px black",width:"100vw",height:"10vh"}}></FormControl>
        </>)
    }
}
