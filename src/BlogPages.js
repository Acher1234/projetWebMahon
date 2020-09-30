import React from "react";
import Socket from "socket.io-client"


export default class Blog extends React.Component
{
    constructor(props) {
        super(props);
    }

    update()
    {
        const socket = Socket()
    }
}
