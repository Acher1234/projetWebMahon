import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import  {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import React from "react";
import Axios from "axios";


export default class AdminPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect:false}
    }

    async userRecup()
    {
        var test =await  Axios.get(this.props.URL + "/recupAllUser",{withCredentials:true})
        console.log(test)
    }

    render()
    {
        this.userRecup()
        return ""
    }
}

